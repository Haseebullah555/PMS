using Application.Contracts.Interfaces.Common;
using Application.Features.Purchase.Requests.Commands;
using Domain.Models;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Purchase.Handlers.Commands
{
    public class AddPurchaseCommandHandler : IRequestHandler<AddPurchaseCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<AddPurchaseCommandHandler> _logger;

        public AddPurchaseCommandHandler(IUnitOfWork unitOfWork, ILogger<AddPurchaseCommandHandler> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        public async Task<int> Handle(AddPurchaseCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                // 1️⃣ Calculate totals
                decimal totalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice);
                decimal unpaidAmount = totalAmount - request.PaidAmount;

                // 2️⃣ Create purchase invoice
                var purchase = new Domain.Models.Purchase
                {
                    SupplierId = request.SupplierId,
                    PurchaseDate = request.PurchaseDate,
                    TotalAmount = totalAmount,
                    PaidAmount = request.PaidAmount,
                    UnPaidAmount = unpaidAmount,
                    Remarks = request.Remarks,
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.Purchases.AddAsync(purchase);
                await _unitOfWork.SaveAsync(cancellationToken);

                // 2️⃣ Update the balace column in supplier and set the uppaidAmount
                // 3️⃣ Update the supplier balance
                var supplier = await _unitOfWork.SupplierLoanPayments.GetSupplierByIdAsync(request.SupplierId);

                supplier.Balance += unpaidAmount;

                _unitOfWork.Suppliers.Update(supplier);
                await _unitOfWork.SaveAsync(cancellationToken);

                // 3️⃣ Create purchase details + update stock
                foreach (var item in request.Items)
                {
                    var detail = new PurchaseDetail
                    {
                        PurchaseId = purchase.Id,
                        FuelTypeId = item.FuelTypeId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                        TotalPrice = item.Quantity * item.UnitPrice,
                        Density = item.Density,
                        CreatedAt = DateTime.UtcNow
                    };

                    await _unitOfWork.PurchaseDetails.AddAsync(detail);

                    // Stock update
                    var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(item.FuelTypeId);

                    if (stock == null) // if fuelTypeId not exist in stock table
                    {
                        stock = new Domain.Models.Stock
                        {
                            FuelTypeId = item.FuelTypeId,
                            Quantity = item.Quantity,
                            UnitPrice = item.UnitPrice, // First time purchase
                            Density = item.Density,
                            CreatedAt = DateTime.UtcNow
                        };

                        await _unitOfWork.Stocks.AddAsync(stock);
                    }
                    else
                    {
                        // Weighted average calculation
                        decimal oldValue = stock.Quantity * stock.UnitPrice;
                        decimal newValue = oldValue + detail.TotalPrice;

                        stock.Quantity += item.Quantity;
                        stock.UnitPrice = newValue / stock.Quantity;

                        _unitOfWork.Stocks.Update(stock);
                    }
                }

                await _unitOfWork.SaveAsync(cancellationToken);

                // 4️⃣ Record payment transaction (if any)
                if (request.PaidAmount > 0)
                {
                    var txn = new FinancialTransaction
                    {
                        Date = DateTime.UtcNow,
                        Type = "Purchase",
                        ReferenceId = purchase.Id,
                        PartyType = "Supplier",
                        PartyId = purchase.SupplierId,
                        Amount = request.PaidAmount,
                        Direction = "OUT",
                        CreatedAt = DateTime.UtcNow
                    };

                }

                await tx.CommitAsync(cancellationToken);

                return purchase.Id;
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync(cancellationToken);
                _logger.LogError(ex, "Error adding purchase");
                throw;
            }
        }

    }
}