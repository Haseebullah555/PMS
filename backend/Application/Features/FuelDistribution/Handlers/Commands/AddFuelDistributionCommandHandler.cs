using Application.Contracts.Interfaces.Common;
using Application.Features.DailyFuelSell.Requests.Commands;
using Application.Features.FuelDistribution.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelDistribution.Handlers.Commands
{
    public class AddFuelDistributionCommandHandler : IRequestHandler<AddFuelDistributionCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddFuelDistributionCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddFuelDistributionCommand request, CancellationToken cancellationToken)
        {

            await using var tx = await _unitOfWork.BeginTransactionAsync();

            // update the Balance column in FuelGun model 
            var fuelGunRecord = await _unitOfWork.FuelGuns.GetFuelGunByAyncId(request.AddFuelDistributionDto.FuelGunId);
            fuelGunRecord.Balance += request.AddFuelDistributionDto.Quantity;
            _unitOfWork.FuelGuns.Update(fuelGunRecord);

            // create fuelDistribution record
            var result = _mapper.Map<Domain.Models.FuelDistribution>(request.AddFuelDistributionDto);

            await _unitOfWork.FuelDistributions.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);

            // save all transactions
            await tx.CommitAsync(cancellationToken);
        }
    }

}