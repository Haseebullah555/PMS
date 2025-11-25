using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.FuelStand.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Queries
{
    public class GetListOfFuelStandsRequestHandler : IRequestHandler<GetListOfFuelStandsRequest, List<FuelStandDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelStandsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<FuelStandDto>> Handle(GetListOfFuelStandsRequest request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.FuelStands.GetAllFuelStands();
        }
    }
}