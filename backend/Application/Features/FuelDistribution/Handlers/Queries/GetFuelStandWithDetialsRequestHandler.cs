using Application.Contracts.Interfaces.Common;
using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;
using Application.Features.FuelDistribution.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.FuelDistribution.Handlers.Queries
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
            var query = _unitOfWork.FuelDistributions.GetFuelStandWithDetails();
            // Map to DTO
            var fuelStantWithDetialsDtos = _mapper.Map<List<GetFuelStandWithDetialsDto>>(query);
            return fuelStantWithDetialsDtos;
        }
    }
}