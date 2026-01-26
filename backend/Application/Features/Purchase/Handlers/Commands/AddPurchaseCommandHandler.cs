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

                // =====================================================
                //  create purchase data
                //======================================================

                var purchase = new Domain.Models.Purchase
                {
                    SupplierId = request.SupplierId,
                    PurchaseDate = request.PurchaseDate,
                    TotalAmount = request.TotalAmount,
                    PaidAmount = request.PaidAmount,
                    UnPaidAmount = request.UnPaidAmount,
                    Remarks = request.Remarks,
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.Purchases.AddAsync(purchase);
                await _unitOfWork.SaveAsync(cancellationToken);

                // =====================================================
                //  Update the balace column in supplier and set the uppaidAmount
                //======================================================

                var supplier = await _unitOfWork.SupplierLoanPayments.GetSupplierByIdAsync(request.SupplierId);

                supplier.Balance += request.UnPaidAmount;

                _unitOfWork.Suppliers.Update(supplier);
                await _unitOfWork.SaveAsync(cancellationToken);

                // =====================================================
                //  Create purchase details + update stock
                //======================================================

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

                    // =====================================================
                    //  Stock update
                    //======================================================

                    var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(item.FuelTypeId);
                    decimal addedLiters = (item.Quantity * 1000) / item.Density;
                    decimal addedValue = addedLiters * item.UnitPrice;
                    if (stock == null) // if fuelTypeId not exist in stock table
                    {
                        stock = new Domain.Models.Stock
                        {
                            FuelTypeId = item.FuelTypeId,
                            QuantityInLiter = addedLiters,
                            UnitPrice = item.UnitPrice, // First time purchase
                            CreatedAt = DateTime.UtcNow
                        };

                        await _unitOfWork.Stocks.AddAsync(stock);
                    }
                    else
                    {
                        decimal oldValue = (decimal)(stock.QuantityInLiter * stock.UnitPrice);
                        decimal newTotalValue = oldValue + addedValue;
                        decimal newTotalQty = stock.QuantityInLiter + addedLiters;
                        stock.QuantityInLiter = newTotalQty;
                        stock.UnitPrice = newTotalValue / newTotalQty;
                        _unitOfWork.Stocks.Update(stock);
                    }
                }

                await _unitOfWork.SaveAsync(cancellationToken);

                // =====================================================
                // Record payment transaction (if any)
                //======================================================

                if (request.PaidAmount > 0)
                {
                    var txn = new FinancialTransaction
                    {
                        Date = DateOnly.FromDateTime(DateTime.UtcNow),
                        Type = "Purchase",
                        ReferenceId = purchase.Id,
                        PartyType = "Supplier",
                        PartyId = purchase.SupplierId,
                        Amount = request.PaidAmount,
                        Direction = "OUT",
                        CreatedAt = DateTime.UtcNow
                    };
                    await _unitOfWork.FinancialTransactions.AddAsync(txn);
                    await _unitOfWork.SaveAsync(cancellationToken);
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