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
                TotalAmount = totalAmount,
                PaidAmount = request.PaidAmount,
                UnpaidAmount = unpaidAmount,
            };

            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                // Save Purchase
                await _unitOfWork.Purchases.Add(purchase);
                await _unitOfWork.SaveChanges(cancellationToken);

                // Handle each item
                foreach (var item in request.Items)
                {
                    var good = await _unitOfWork.Goods.Get(item.GoodId)
                        ?? throw new Exception($"Good {item.GoodId} not found");

                    // Find or create Stock
                    var stock = await _unitOfWork.Stocks.GetByGoodIdAsync(item.GoodId);
                    if (stock == null)
                    {
                        stock = new Domain.Models.Stock
                        {
                            GoodId = good.Id,
                            Description = good.Description,
                            Quantity = 0,
                            UnitPrice = item.UnitPrice
                        };
                        await _unitOfWork.Stocks.Add(stock);
                        await _unitOfWork.SaveChanges(cancellationToken);
                    }

                    // Update stock quantity
                    int newQty = stock.Quantity + item.Quantity;
                    // Weighted average cost
                    stock.UnitPrice = ((stock.Quantity * stock.UnitPrice) + (item.Quantity * item.UnitPrice)) / newQty;
                    stock.Quantity = newQty;

                    await _unitOfWork.Stocks.Update(stock);

                    // Create PurchaseDetail
                    var detail = new PurchaseDetail
                    {
                        PurchaseId = purchase.Id,
                        GoodId = item.GoodId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                        TotalPrice = item.UnitPrice * item.Quantity
                    };

                    await _unitOfWork.PurchaseDetails.Add(detail);
                }

                await _unitOfWork.SaveChanges(cancellationToken);

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
                    await _unitOfWork.FinancialTransactions.Add(txn);
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
                    await _unitOfWork.SupplierLoans.Add(loan);
                }

                await _unitOfWork.SaveChanges(cancellationToken);
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