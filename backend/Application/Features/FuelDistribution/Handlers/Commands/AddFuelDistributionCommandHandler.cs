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
            var result = _mapper.Map<Domain.Models.FuelDistribution>(request.AddFuelDistributionDto);
            await _unitOfWork.FuelDistributions.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }

}