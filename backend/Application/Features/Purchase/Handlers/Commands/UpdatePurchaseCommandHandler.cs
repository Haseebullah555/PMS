using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Purchase.Handlers.Commands
{
    public class UpdatePurchaseCommandHandler : IRequestHandler<UpdatePurchaseCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdatePurchaseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<int> Handle(UpdatePurchaseCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            // Load purchase with details
            var purchase = await _unitOfWork.Purchases
                .Query()
                .Include(p => p.PurchaseDetails)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (purchase == null)
                throw new KeyNotFoundException("Purchase not found");

            // 1️⃣ Calculate totals
            decimal totalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice);
            decimal unpaidAmount = totalAmount - request.PaidAmount;

            // --- update purchate table ---
            purchase.SupplierId = request.SupplierId;
            purchase.PurchaseDate = request.PurchaseDate;
            purchase.TotalAmount = request.TotalAmount;
            purchase.PaidAmount = request.PaidAmount;
            purchase.UnPaidAmount = unpaidAmount;

            // --- Remove deleted items ---
            foreach (var detail in purchase.PurchaseDetails.ToList())
            {
                if (!request.Items.Any(i => i.FuelTypeId == detail.FuelTypeId))
                {
                    purchase.PurchaseDetails.Remove(detail);
                }
            }

            // --- update purchate detial table ---
            foreach (var item in request.Items)
            {
                var existingDetail = purchase.PurchaseDetails
                    .FirstOrDefault(d => d.FuelTypeId == item.FuelTypeId);

                if (existingDetail != null)
                {
                    // Update existing detail
                    existingDetail.Quantity = item.Quantity;
                    existingDetail.UnitPrice = item.UnitPrice;
                    existingDetail.TotalPrice = item.TotalPrice;
                }
                else
                {
                    // Add new detail
                    purchase.PurchaseDetails.Add(new PurchaseDetail
                    {
                        PurchaseId = purchase.Id,
                        FuelTypeId = item.FuelTypeId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice,
                        TotalPrice = item.TotalPrice
                    });
                }
            }

            // 2️⃣ update supplier table: balance column in supplier and set the unpaidAmount
            var supplier = await _unitOfWork.SupplierLoanPayments.GetSupplierByIdAsync(request.SupplierId);

            if (supplier.Balance > unpaidAmount)
            {
                supplier.Balance -= purchase.UnPaidAmount; // Revert previous unpaid amount
                supplier.Balance += unpaidAmount;          // Apply new unpaid amount

                _unitOfWork.Suppliers.Update(supplier);
                await _unitOfWork.SaveAsync(cancellationToken);
            }
            else
            {
                  return 0;
                // throw new InvalidOperationException("the balance should be greater than the unpaid amount");
            }




            // Save changes
            await _unitOfWork.SaveAsync(cancellationToken);
            // save all transactions
            await tx.CommitAsync(cancellationToken);
            return purchase.Id;
        }
    }
}