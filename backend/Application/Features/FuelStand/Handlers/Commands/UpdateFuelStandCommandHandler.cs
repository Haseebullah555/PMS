using Application.Contracts.Interfaces.Common;
using Application.Features.FuelStand.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Commands
{
    public class UpdateFuelStandCommandHandler : IRequestHandler<UpdateFuelStandCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateFuelStandCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateFuelStandCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelStand>(request.FuelStandDto);
            _unitOfWork.FuelStands.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}