using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelDistributionDtos;
using Application.Features.FuelStand.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Queries
{
    public class GetFuelStandWithDetialsRequestHandler : IRequestHandler<GetFuelStandWithDetialsRequest, List<GetFuelStandWithDetialsDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetFuelStandWithDetialsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<GetFuelStandWithDetialsDto>> Handle(GetFuelStandWithDetialsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.FuelStands.GetFuelStandWithDetails();
            // Map to DTO
            var fuelStantWithDetialsDtos = _mapper.Map<List<GetFuelStandWithDetialsDto>>(query);
            return fuelStantWithDetialsDtos;
        }
    }
}