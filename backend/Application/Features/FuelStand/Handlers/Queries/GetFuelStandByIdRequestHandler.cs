using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelStandDtos;
using Application.Features.FuelStand.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Queries
{
    public class GetFuelStandByIdRequestHandler : IRequestHandler<GetFuelStandByIdRequest, FuelStandDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetFuelStandByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<FuelStandDto> Handle(GetFuelStandByIdRequest request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.FuelStands.GetFuelStandById(request.FuelStandId);
        }
    }
}