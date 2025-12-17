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

            var result = _mapper.Map<Domain.Models.DailyFuelSell>(request.DailyFuelSellDto);
            await _unitOfWork.DailyFuelSells.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);

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