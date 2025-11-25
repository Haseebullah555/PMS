using Application.Contracts.Interfaces.Common;
using Application.Features.FuelGun.Commands.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelGun.Handlers.Commands
{
    public class CreateFuelGunCommandHandler : IRequestHandler<CreateFuelGunCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateFuelGunCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreateFuelGunCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelGun>(request.FuelGunDto);
            await _unitOfWork.FuelGuns.Add(result);
        }
    }
}