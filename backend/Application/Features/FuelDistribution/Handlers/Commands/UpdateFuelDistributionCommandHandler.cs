using Application.Contracts.Interfaces.Common;
using Application.Features.FuelDistribution.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelDistribution.Handlers.Commands
{
    public class UpdateFuelDistributionCommandHandler : IRequestHandler<UpdateFuelDistributionCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateFuelDistributionCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateFuelDistributionCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            // update the Balance column in FuelGun model 
            var fuelGunRecord = await _unitOfWork.FuelGuns.GetFuelGunByAyncId(request.UpdateFuelDistributionDto.FuelGunId);
            fuelGunRecord.Balance -= request.UpdateFuelDistributionDto.Quantity;
            _unitOfWork.FuelGuns.Update(fuelGunRecord);
            
            // update stock quantity field
            var stockRecord = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(request.UpdateFuelDistributionDto.FuelTypeId);
            stockRecord.QuantityInLiter -= request.UpdateFuelDistributionDto.Quantity;
            _unitOfWork.Stocks.Update(stockRecord);

            // create fuelDistribution record
            var result = _mapper.Map<Domain.Models.FuelDistribution>(request.UpdateFuelDistributionDto);

            _unitOfWork.FuelDistributions.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);

            // save all transactions
            await tx.CommitAsync(cancellationToken);
        }

    }
}