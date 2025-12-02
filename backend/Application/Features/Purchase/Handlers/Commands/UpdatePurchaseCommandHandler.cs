using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.sample.Handlers.Commands
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
            // Load purchase with details
            var purchase = await _unitOfWork.Purchases
                .Query()
                .Include(p => p.PurchaseDetails)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            // if (purchase == null)
            //     throw new NotFoundException("Purchase not found");


            // 1️⃣ Calculate totals
            decimal totalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice);
            decimal unpaidAmount = totalAmount - request.PaidAmount;

            // --- Update parent ---
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

            // --- Update existing or add new items ---
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

            // Save changes
            await _unitOfWork.SaveAsync(cancellationToken);

            return purchase.Id;
        }
    }
}