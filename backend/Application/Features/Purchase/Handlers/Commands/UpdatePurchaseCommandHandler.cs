
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

            // Load purchase with details
            var purchase = await _unitOfWork.Purchases
                .Query()
                .Include(p => p.PurchaseDetails)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (purchase == null)
                throw new KeyNotFoundException("Purchase not found");
            // 1️⃣ Store OLD unpaid amount before updating
            decimal oldUnpaidAmount = purchase.UnPaidAmount;
            // 1️⃣ Calculate totals
            decimal totalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice);
            decimal newUnpaidAmount = totalAmount - request.PaidAmount;

            // --- update purchate table ---
            purchase.SupplierId = request.SupplierId;
            purchase.PurchaseDate = request.PurchaseDate;
            purchase.TotalAmount = totalAmount;
            purchase.PaidAmount = request.PaidAmount;
            purchase.UnPaidAmount = newUnpaidAmount;

            // --- Remove deleted items ---
            foreach (var detail in purchase.PurchaseDetails.ToList())
            {
                if (!request.Items.Any(i => i.FuelTypeId == detail.FuelTypeId))
                {
                    purchase.PurchaseDetails.Remove(detail);
                }
            }


            // foreach (var item in request.Items)
            // {
            //     var existingDetail = purchase.PurchaseDetails
            //         .FirstOrDefault(d => d.FuelTypeId == item.FuelTypeId);

            //     var stock = await _unitOfWork.Stocks
            //         .GetByFuelTypeIdAsync(item.FuelTypeId);

            //     if (stock == null)
            //         continue;

            //     if (existingDetail == null)
            //     {
            //         // 🔹 OLD values
            //         decimal oldQuantityInLiter = (existingDetail.Quantity * 1000m) / existingDetail.Density;

            //         decimal oldValue = (decimal)(oldQuantityInLiter * stock.UnitPrice);

            //         // 🔹 NEW values
            //         decimal newQtyLiter =
            //             (item.Quantity * 1000m) / item.Density;

            //         decimal newValue =
            //             newQtyLiter * item.UnitPrice;

            //         // 🔹 Update stock
            //         decimal totalValue = (decimal)(stock.QuantityInLiter * stock.UnitPrice)
            //             - oldValue
            //             + newValue;

            //         decimal totalQty =
            //             stock.QuantityInLiter
            //             - oldQuantityInLiter
            //             + newQtyLiter;

            //         stock.QuantityInLiter = totalQty;
            //         stock.UnitPrice = totalQty == 0 ? 0 : totalValue / totalQty;

            //         _unitOfWork.Stocks.Update(stock);

            //         // 🔹 Update purchase detail
            //         existingDetail.Quantity = item.Quantity;
            //         existingDetail.UnitPrice = item.UnitPrice;
            //         existingDetail.TotalPrice = item.Quantity * item.UnitPrice;
            //         existingDetail.Density = item.Density;
            //     }
            //     else
            //     {
            //         // 🔹 NEW ITEM → ADD STOCK
            //         decimal qtyLiter =
            //             (item.Quantity * 1000m) / item.Density;

            //         decimal totalValue = (decimal)(stock.QuantityInLiter * stock.UnitPrice)
            //             + (qtyLiter * item.UnitPrice);

            //         stock.QuantityInLiter += qtyLiter;
            //         stock.UnitPrice = totalValue / stock.QuantityInLiter;

            //         _unitOfWork.Stocks.Update(stock);

            //         purchase.PurchaseDetails.Add(new PurchaseDetail
            //         {
            //             PurchaseId = purchase.Id,
            //             FuelTypeId = item.FuelTypeId,
            //             Quantity = item.Quantity,
            //             UnitPrice = item.UnitPrice,
            //             TotalPrice = item.Quantity * item.UnitPrice,
            //             Density = item.Density,
            //             CreatedAt = DateTime.UtcNow
            //         });
            //     }
            // }


            // --- update purchate detial table ---
            foreach (var item in request.Items)
            {
                var existingDetail = purchase.PurchaseDetails
                    .FirstOrDefault(d => d.FuelTypeId == item.FuelTypeId);

                var stock = await _unitOfWork.Stocks
                             .GetByFuelTypeIdAsync(item.FuelTypeId);


                if (existingDetail != null)
                {
                    // Update existing detail
                    existingDetail.Quantity = item.Quantity;
                    existingDetail.UnitPrice = item.UnitPrice;
                    existingDetail.Density = item.Density;
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
                        Density = item.Density,
                        TotalPrice = item.TotalPrice
                    });

                }

                // Stock update
                // var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(item.FuelTypeId);

                // if (stock != null) // if fuelTypeId not exist in stock table
                // {

                //     decimal previousQuantityInLiter =  stock.QuantityInLiter;
                //     decimal currenctQuantityInLiter = (item.Quantity * 1000m) / item.Density;
                //     decimal result = previousQuantityInLiter - currenctQuantityInLiter;


                //     _unitOfWork.Stocks.Update(stock);

                // }


            }

            // 2️⃣ update supplier table: balance column in supplier and set the unpaidAmount
            var supplier = await _unitOfWork.Suppliers.GetSupplierByIdAsync(request.SupplierId);
            // Calculate balance difference
            decimal balanceDelta = newUnpaidAmount - oldUnpaidAmount;
            // Apply difference
            supplier.Balance += balanceDelta;

            // Optional validation (recommended)
            if (supplier.Balance < 0)
            {
                response.Success = false;
                response.Message = "Supplier balance cannot be negative.";
                return response;
            }

            _unitOfWork.Suppliers.Update(supplier);

            // Save changes
            await _unitOfWork.SaveAsync(cancellationToken);
            // save all transactions
            await tx.CommitAsync(cancellationToken);
            response.Id = purchase.Id;
            response.Success = true;
            response.Message = "Purchase updated successfully";
            return response;
        }
    }
}

// using Application.Contracts.Interfaces.Common;
// using Application.Features.Response;
// using Application.Features.Purchase.Requests.Commands;
// using Domain.Models;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using Application.Features.sample.Requests.Commands;

// namespace Application.Features.Purchase.Handlers.Commands
// {
//     public class UpdatePurchaseCommandHandler 
//         : IRequestHandler<UpdatePurchaseCommand, BaseCommandResponse>
//     {
//         private readonly IUnitOfWork _unitOfWork;

//         public UpdatePurchaseCommandHandler(IUnitOfWork unitOfWork)
//         {
//             _unitOfWork = unitOfWork;
//         }

//         public async Task<BaseCommandResponse> Handle(
//             UpdatePurchaseCommand request,
//             CancellationToken cancellationToken)
//         {
//             await using var tx = await _unitOfWork.BeginTransactionAsync();
//             var response = new BaseCommandResponse();

//             try
//             {
//                 // 🔹 Load purchase with details
//                 var purchase = await _unitOfWork.Purchases
//                     .Query()
//                     .Include(p => p.PurchaseDetails)
//                     .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

//                 if (purchase == null)
//                     throw new KeyNotFoundException("Purchase not found");

//                 // 🔹 Save old unpaid amount
//                 decimal oldUnpaidAmount = purchase.UnPaidAmount;

//                 // 🔹 Calculate new totals
//                 decimal totalAmount = request.Items.Sum(i => i.Quantity * i.UnitPrice);
//                 decimal newUnpaidAmount = totalAmount - request.PaidAmount;

//                 // 🔹 Update purchase header
//                 purchase.SupplierId = request.SupplierId;
//                 purchase.PurchaseDate = request.PurchaseDate;
//                 purchase.TotalAmount = totalAmount;
//                 purchase.PaidAmount = request.PaidAmount;
//                 purchase.UnPaidAmount = newUnpaidAmount;

//                 // =====================================================
//                 // 🔥 STOCK UPDATE (REVERSE OLD → APPLY NEW)
//                 // =====================================================
//                 foreach (var oldDetail in purchase.PurchaseDetails.ToList())
//                 {
//                     var stock = await _unitOfWork.Stocks
//                         .GetByFuelTypeIdAsync(oldDetail.FuelTypeId);

//                     if (stock == null) continue;

//                     decimal oldQuantityInLiter =
//                         (oldDetail.Quantity * 1000m) / oldDetail.Density;

//                     decimal oldValue = (decimal)(oldQuantityInLiter * stock.UnitPrice);

//                     var newItem = request.Items
//                         .FirstOrDefault(i => i.FuelTypeId == oldDetail.FuelTypeId);

//                     if (newItem == null)
//                     {
//                         // ❌ Item removed
//                         stock.QuantityInLiter -= oldQuantityInLiter;

//                         if (stock.QuantityInLiter <= 0)
//                         {
//                             stock.QuantityInLiter = 0;
//                             stock.UnitPrice = 0;
//                         }
//                         else
//                         {
//                             decimal remainingValue = (decimal)((stock.QuantityInLiter * stock.UnitPrice) - oldValue);

//                             stock.UnitPrice =
//                                 remainingValue / stock.QuantityInLiter;
//                         }
//                     }
//                     else
//                     {
//                         // 🔁 Item updated
//                         decimal newQtyLiter =
//                             (newItem.Quantity * 1000m) / newItem.Density;

//                         decimal newValue =
//                             newQtyLiter * newItem.UnitPrice;

//                         decimal totalValue = (decimal)((stock.QuantityInLiter * stock.UnitPrice) - oldValue + newValue);

//                         decimal totalQty =
//                             stock.QuantityInLiter
//                             - oldQuantityInLiter
//                             + newQtyLiter;

//                         stock.QuantityInLiter = totalQty;
//                         stock.UnitPrice = totalQty == 0 ? 0 : totalValue / totalQty;
//                     }

//                     _unitOfWork.Stocks.Update(stock);
//                 }

//                 // 🔹 Handle newly added items
//                 foreach (var item in request.Items)
//                 {
//                     if (!purchase.PurchaseDetails
//                         .Any(d => d.FuelTypeId == item.FuelTypeId))
//                     {
//                         var stock = await _unitOfWork.Stocks
//                             .GetByFuelTypeIdAsync(item.FuelTypeId);

//                         decimal qtyLiter =
//                             (item.Quantity * 1000m) / item.Density;

//                         if (stock == null)
//                         {
//                             stock = new Domain.Models.Stock
//                             {
//                                 FuelTypeId = item.FuelTypeId,
//                                 QuantityInLiter = qtyLiter,
//                                 UnitPrice = item.UnitPrice,
//                                 CreatedAt = DateTime.UtcNow
//                             };
//                             await _unitOfWork.Stocks.AddAsync(stock);
//                         }
//                         else
//                         {
//                             decimal totalValue = (decimal)((stock.QuantityInLiter * stock.UnitPrice) + (qtyLiter * item.UnitPrice));

//                             stock.QuantityInLiter += qtyLiter;
//                             stock.UnitPrice = totalValue / stock.QuantityInLiter;

//                             _unitOfWork.Stocks.Update(stock);
//                         }
//                     }
//                 }

//                 // =====================================================
//                 // 🔹 UPDATE PURCHASE DETAILS
//                 // =====================================================
//                 purchase.PurchaseDetails.Clear();

//                 foreach (var item in request.Items)
//                 {
//                     purchase.PurchaseDetails.Add(new PurchaseDetail
//                     {
//                         PurchaseId = purchase.Id,
//                         FuelTypeId = item.FuelTypeId,
//                         Quantity = item.Quantity,
//                         UnitPrice = item.UnitPrice,
//                         TotalPrice = item.Quantity * item.UnitPrice,
//                         Density = item.Density,
//                         CreatedAt = DateTime.UtcNow
//                     });
//                 }

//                 // =====================================================
//                 // 🔹 UPDATE SUPPLIER BALANCE
//                 // =====================================================
//                 var supplier = await _unitOfWork.Suppliers
//                     .GetSupplierByIdAsync(request.SupplierId);

//                 decimal balanceDelta = newUnpaidAmount - oldUnpaidAmount;
//                 supplier.Balance += balanceDelta;

//                 if (supplier.Balance < 0)
//                     throw new InvalidOperationException("Supplier balance cannot be negative");

//                 _unitOfWork.Suppliers.Update(supplier);

//                 await _unitOfWork.SaveAsync(cancellationToken);
//                 await tx.CommitAsync(cancellationToken);

//                 response.Success = true;
//                 response.Id = purchase.Id;
//                 response.Message = "Purchase updated successfully";
//                 return response;
//             }
//             catch
//             {
//                 await tx.RollbackAsync(cancellationToken);
//                 throw;
//             }
//         }
//     }
// }
