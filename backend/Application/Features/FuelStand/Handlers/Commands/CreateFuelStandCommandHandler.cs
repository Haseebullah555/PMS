using Application.Contracts.Interfaces.Common;
using Application.Features.FuelStand.Commands.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Commands
{
    public class CreateFuelStandCommandHandler : IRequestHandler<CreateFuelStandCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateFuelStandCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreateFuelStandCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelStand>(request.FuelStandDto);
            await _unitOfWork.FuelStands.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}