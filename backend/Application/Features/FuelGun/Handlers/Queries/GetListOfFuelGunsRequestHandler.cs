using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.FuelGun.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelGun.Handlers.Queries
{
    public class GetListOfFuelGunsRequestHandler : IRequestHandler<GetListOfFuelGunsRequest, List<FuelGunDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelGunsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<FuelGunDto>> Handle(GetListOfFuelGunsRequest request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.FuelGuns.GetAllFuelGuns();
        }
    }
}