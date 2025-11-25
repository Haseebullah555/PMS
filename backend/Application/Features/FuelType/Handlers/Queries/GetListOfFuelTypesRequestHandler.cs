using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.FuelType.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelType.Handlers.Queries
{
    public class GetListOfFuelTypesRequestHandler : IRequestHandler<GetListOfFuelTypesRequest, List<FuelTypeDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelTypesRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<FuelTypeDto>> Handle(GetListOfFuelTypesRequest request, CancellationToken cancellationToken)
        {
            var fuelTypes = _unitOfWork.FuelTypes.GetAll();
            return _mapper.Map<List<FuelTypeDto>>(fuelTypes);
        }
    }
}