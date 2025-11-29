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
            // var availableFund = await _unitOfWork.FinancialTransactions
            // .GetAvailableFundAsync();

            // if (request.PaidAmount > availableFund)
            //     throw new InvalidOperationException("Not enough business funds for this purchase payment.");

            // Calculate total
            decimal totalAmount = request.Items.Sum(i => i.UnitPrice * i.Quantity);
            decimal unpaidAmount = totalAmount - request.PaidAmount;

            var purchase = new Domain.Models.Purchase
            {
                SupplierId = request.SupplierId,
                PurchaseDate = request.PurchaseDate,
                PaidAmount = request.PaidAmount
            };

            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                // Save Purchase
                await _unitOfWork.Purchases.AddAsync(purchase);
                await _unitOfWork.SaveAsync(cancellationToken);

                // Handle each item
                foreach (var item in request.Items)
                {
                    var fuelType = await _unitOfWork.FuelTypes.GetByIdAsync(item.FuelTypeId)
                        ?? throw new Exception($"FuelType {item.FuelTypeId} not found");

                    // Find or create Stock
                    var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(item.FuelTypeId);
                    if (stock == null)
                    {
                        stock = new Domain.Models.Stock
                        {
                            FuelTypeId = fuelType.Id,
                            Quantity = 0,
                        };
                        await _unitOfWork.Stocks.AddAsync(stock);
                        await _unitOfWork.SaveAsync(cancellationToken);
                    }

                    // Update stock quantity
                    int newQty = stock.Quantity + item.Quantity;
                    // Weighted average cost
                    stock.Quantity = newQty;

                    _unitOfWork.Stocks.Update(stock);

                    // Create PurchaseDetail
                    var detail = new PurchaseDetail
                    {
                        PurchaseId = purchase.Id,
                        FuelTypeId = item.FuelTypeId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                    };

                    await _unitOfWork.PurchaseDetails.AddAsync(detail);
                }

                await _unitOfWork.SaveAsync(cancellationToken);

                // Record financial transaction (paid part)
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
                        Direction = "OUT"
                    };
                    await _unitOfWork.FinancialTransactions.AddAsync(txn);
                }

                // Record supplier loan (if unpaid)
                if (unpaidAmount > 0)
                {
                    var loan = new SupplierLoan
                    {
                        SupplierId = request.SupplierId,
                        Amount = unpaidAmount,
                        LoanDate = DateTime.UtcNow,
                        IsSettled = false
                    };
                    await _unitOfWork.SupplierLoans.AddAsync(loan);
                }

                await _unitOfWork.SaveAsync(cancellationToken);
                await tx.CommitAsync(cancellationToken);

                return purchase.Id;
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync(cancellationToken);
                _logger.LogError(ex, "Error while adding purchase");
                throw;
            }
        }
    }
}