using Application.Contracts.Interfaces.Common;
using Application.Features.FuelType.Commands.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelType.Handlers.Commands
{
    public class CreateFuelTypeCommandHandler : IRequestHandler<CreateFuelTypeCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateFuelTypeCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreateFuelTypeCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.FuelTypes>(request.FuelTypeDto);
            await _unitOfWork.FuelTypes.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}