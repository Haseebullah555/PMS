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
            var fuelGunRecord = await _unitOfWork.FuelGuns.GetFuelGunByAyncId(request.DailyFuelSellDto.FuelGunId);
            fuelGunRecord.Balance -= request.DailyFuelSellDto.SoldFuelAmount;
            _unitOfWork.FuelGuns.Update(fuelGunRecord);


            // =============================================
            // get the fuelStand record (to get the staffId)
            // =============================================
            var fuelStand = await _unitOfWork.Staffs.GetFuelStandByIdAsync(request.DailyFuelSellDto.FuelStandId);
            var dailyFuelSell = _mapper.Map<Domain.Models.DailyFuelSell>(request.DailyFuelSellDto);

            // add the StaffId with dailyFuelSell
            dailyFuelSell.StaffId = fuelStand.StaffId;

            await _unitOfWork.DailyFuelSells.AddAsync(dailyFuelSell);
            await _unitOfWork.SaveAsync(cancellationToken);


            // =============================================
            // update the stock table (quantityInLiter) column base in fuelTypeId 
            // =============================================

            // var stockUpdate = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(fuelGunRecord.)




            // save all transactions
            await tx.CommitAsync(cancellationToken);




            // var dailyFuelSell = new Domain.Models.DailyFuelSell
            // {
            //     FuelStandId = request.DailyFuelSellDto.FuelStandId,
            //     FuelGunId = request.DailyFuelSellDto.FuelGunId,
            //     CurrentMeterDegree = request.DailyFuelSellDto.CurrentMeterDegree,
            //     OldMeterDegree = request.DailyFuelSellDto.OldMeterDegree,
            //     SoldFuelAmount = request.DailyFuelSellDto.SoldFuelAmount,
            //     FuelUnitPrice = request.DailyFuelSellDto.FuelUnitPrice,
            //     TotalPrice = request.DailyFuelSellDto.TotalPrice,
            //     CollectedMoney = request.DailyFuelSellDto.CollectedMoney,
            //     Date = request.DailyFuelSellDto.Date,
            //     Note = request.DailyFuelSellDto.Note,
            //     StaffId = fuelStand.StaffId
            // };
            // await _unitOfWork.DailyFuelSells.AddAsync(dailyFuelSell);
            // await _unitOfWork.SaveAsync(cancellationToken);



            // Create FuelStand entity
            // var dailyFuelSell = new Domain.Models.DailyFuelSell
            // {
            //     FuelStandId = request.DailyFuelSellDto.FuelStandId,
            //     FuelGunId = request.DailyFuelSellDto.FuelGunId,
            //     CurrentMeterDegree = request.DailyFuelSellDto.CurrentMeterDegree,
            //     OldMeterDegree = request.DailyFuelSellDto.OldMeterDegree,
            //     SoldFuelAmount = request.DailyFuelSellDto.SoldFuelAmount,
            //     FuelUnitPrice = request.DailyFuelSellDto.FuelUnitPrice,
            //     TotalPrice = request.DailyFuelSellDto.TotalPrice,
            //     CollectedMoney = request.DailyFuelSellDto.CollectedMoney,
            //     Date = request.DailyFuelSellDto.Date,
            //     Note = request.DailyFuelSellDto.Note,
            // };
            // // Save to DB
            // await _unitOfWork.DailyFuelSells.AddAsync(dailyFuelSell);
            // await _unitOfWork.SaveAsync(cancellationToken);
        }
    }

}