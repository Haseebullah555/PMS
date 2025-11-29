using Application.Contracts.Interfaces.Common;
using Application.Features.FuelGun.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelGun.Handlers.Commands
{
    public class UpdateFuelGunCommandHandler : IRequestHandler<UpdateFuelGunCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateFuelGunCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateFuelGunCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelGun>(request.FuelGunDto);
            _unitOfWork.FuelGuns.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}