
using Application.Contracts.Interfaces.Common;
using Application.Features.Response;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Purchase.Handlers.Commands
{
    public class UpdatePurchaseCommandHandler : IRequestHandler<UpdatePurchaseCommand, BaseCommandResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdatePurchaseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<BaseCommandResponse> Handle(UpdatePurchaseCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();
            var response = new BaseCommandResponse();

            try
            {
                // =====================================================
                //  Load purchase table data with details
                //======================================================

                var purchase = await _unitOfWork.Purchases
                    .Query()
                    .Include(p => p.PurchaseDetails)
                    .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

                if (purchase == null)
                    throw new KeyNotFoundException("Purchase not found");

                // 2️⃣ Store OLD unpaid amount (to delete the previous UnPaidAmount after that add the new once)
                decimal oldUnpaidAmount = purchase.UnPaidAmount;

                // =====================================================
                //  Update purchase table data 
                //======================================================

                purchase.SupplierId = request.SupplierId;
                purchase.PurchaseDate = request.PurchaseDate;
                purchase.TotalAmount = request.TotalAmount;
                purchase.PaidAmount = request.PaidAmount;
                purchase.UnPaidAmount = request.UnpaidAmount;

                // =====================================================
                //  Remove deleted details from purchaseDetial table
                //======================================================

                foreach (var detail in purchase.PurchaseDetails.ToList())
                {
                    if (!request.Items.Any(i => i.FuelTypeId == detail.FuelTypeId))
                    {
                        purchase.PurchaseDetails.Remove(detail);
                    }
                }

                // =====================================================
                // Update / Add purchase details
                //======================================================

                foreach (var item in request.Items)
                {
                    var existingDetail = purchase.PurchaseDetails
                        .FirstOrDefault(d => d.FuelTypeId == item.FuelTypeId);

                    if (existingDetail != null)
                    {
                        existingDetail.Quantity = item.Quantity;
                        existingDetail.UnitPrice = item.UnitPrice;
                        existingDetail.Density = item.Density;
                        existingDetail.TotalPrice = item.Quantity * item.UnitPrice;
                    }
                    else
                    {
                        purchase.PurchaseDetails.Add(new PurchaseDetail
                        {
                            PurchaseId = purchase.Id,
                            FuelTypeId = item.FuelTypeId,
                            Quantity = item.Quantity,
                            UnitPrice = item.UnitPrice,
                            Density = item.Density,
                            TotalPrice = item.Quantity * item.UnitPrice,
                            CreatedAt = DateTime.UtcNow
                        });
                    }
                }

                // =====================================================
                //  Revert OLD stock quantities
                //======================================================

                foreach (var oldDetail in purchase.PurchaseDetails)
                {
                    var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(oldDetail.FuelTypeId);
                    if (stock != null)
                    {
                        decimal oldQtyInLiter = (oldDetail.Quantity * 1000) / oldDetail.Density;
                        stock.QuantityInLiter -= oldQtyInLiter;

                        if (stock.QuantityInLiter < 0)
                            stock.QuantityInLiter = 0;

                        _unitOfWork.Stocks.Update(stock);
                    }
                }

                // ========================================================
                //   Apply NEW stock quantities (same logic as AddPurchaseCommandHandler)
                //=========================================================

                foreach (var item in request.Items)
                {
                    var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(item.FuelTypeId);

                    decimal newQtyInLiter = (item.Quantity * 1000) / item.Density;
                    decimal newValue = item.Quantity * item.UnitPrice;

                    if (stock == null)
                    {
                        stock = new Domain.Models.Stock
                        {
                            FuelTypeId = item.FuelTypeId,
                            QuantityInLiter = newQtyInLiter,
                            UnitPrice = item.UnitPrice,
                            CreatedAt = DateTime.UtcNow
                        };

                        await _unitOfWork.Stocks.AddAsync(stock);
                    }
                    else
                    {
                        decimal oldValue = (decimal)(stock.QuantityInLiter * stock.UnitPrice);

                        stock.QuantityInLiter += newQtyInLiter;
                        stock.UnitPrice = (oldValue + newValue) / stock.QuantityInLiter;

                        _unitOfWork.Stocks.Update(stock);
                    }
                }

                // ========================================================
                //   Update supplier balance using difference
                //=========================================================

                var supplier = await _unitOfWork.Suppliers.GetSupplierByIdAsync(request.SupplierId);
                decimal balanceDelta = request.UnpaidAmount - oldUnpaidAmount;
                supplier.Balance += balanceDelta;

                if (supplier.Balance < 0)
                    throw new InvalidOperationException("Supplier balance cannot be negative.");

                _unitOfWork.Suppliers.Update(supplier);

                // 🔟 Save + Commit
                await _unitOfWork.SaveAsync(cancellationToken);
                await tx.CommitAsync(cancellationToken);

                response.Id = purchase.Id;
                response.Success = true;
                response.Message = "Purchase updated successfully";
                return response;
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync(cancellationToken);
                throw;
            }
        }

    }
}