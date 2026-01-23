using Application.Contracts.Interfaces.Common;
using Application.Features.FuelType.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelType.Handlers.Commands
{
    public class UpdateFuelTypeCommandHandler : IRequestHandler<UpdateFuelTypeCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateFuelTypeCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateFuelTypeCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelType>(request.UpdateFuelTypeDto);
            _unitOfWork.FuelTypes.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}