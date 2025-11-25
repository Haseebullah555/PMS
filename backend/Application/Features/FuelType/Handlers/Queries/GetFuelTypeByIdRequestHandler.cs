using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.FuelType.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelType.Handlers.Queries
{
    public class GetFuelTypeByIdRequestHandler : IRequestHandler<GetFuelTypeByIdRequest, FuelTypeDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetFuelTypeByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<FuelTypeDto> Handle(GetFuelTypeByIdRequest request, CancellationToken cancellationToken)
        {
            var fuelTypes = _unitOfWork.FuelTypes.Get(request.FuelTypeId);
            return _mapper.Map<FuelTypeDto>(fuelTypes);
        }
    }
}