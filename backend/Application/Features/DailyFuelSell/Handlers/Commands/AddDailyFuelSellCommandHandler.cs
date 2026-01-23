using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Application.Features.DailyFuelSell.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.DailyFuelSell.Handlers.Commands
{
    public class AddDailyFuelSellCommandHandler : IRequestHandler<AddDailyFuelSellCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddDailyFuelSellCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(AddDailyFuelSellCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            // =============================================
            // update the Balance column in FuelGun model 
            // =============================================
            // var fuelGunRecord = await _unitOfWork.FuelGuns.GetFuelGunByAyncId(request.AddDailyFuelSellDto.FuelGunId);
            // fuelGunRecord.Balance -= request.AddDailyFuelSellDto.SoldFuelAmount;
            // _unitOfWork.FuelGuns.Update(fuelGunRecord);


            // =============================================
            // get the fuelStand record (to get the staffId)
            // =============================================

            // var fuelStand = await _unitOfWork.Staffs.GetFuelStandByIdAsync(request.AddDailyFuelSellDto.FuelStandId);
            // var dailyFuelSell = _mapper.Map<Domain.Models.DailyFuelSell>(request.AddDailyFuelSellDto);

            // add the StaffId with dailyFuelSell
            // dailyFuelSell.StaffId = fuelStand.StaffId;

        //    var entity = _mapper.Map<Domain.Models.DailyFuelSell>(request.AddDailyFuelSellDto);
           var entity = _mapper.Map<Domain.Models.DailyFuelSell>(request.AddDailyFuelSellDto);



            // if (entity == null)
            //     throw new Exception("Mapping failed");


            await _unitOfWork.DailyFuelSells.AddAsync(entity);
            await _unitOfWork.SaveAsync(cancellationToken);

            // await _unitOfWork.DailyFuelSells.AddAsync(request);
            // await _unitOfWork.SaveAsync(cancellationToken);


            // =============================================
            // update the stock table (quantityInLiter) column base in fuelTypeId 
            // =============================================

            //var fuelDistributionLastRecord = await _unitOfWork.FuelDistributions.GetLastRecordByFuelGunId(request.AddDailyFuelSellDto.FuelGunId);
            //var recordOnStock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(fuelDistributionLastRecord.FuelTypeId);
            //recordOnStock.QuantityInLiter -= request.AddDailyFuelSellDto.SoldFuelAmount;
            //_unitOfWork.Stocks.Update(recordOnStock);
            //await _unitOfWork.SaveAsync(cancellationToken);
            //await _cache.RemoveGroupAsync("dashboard:daily-fuel-sales:null:null"); // Invalidate cache

            // save all transactions
            await tx.CommitAsync(cancellationToken);
        }
    }

}