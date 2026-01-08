using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelGunDtos;
using Application.Features.FuelGun.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelGun.Handlers.Queries
{
    public class GetFuelGunByIdRequestHandler : IRequestHandler<GetFuelGunByIdRequest, FuelGunListDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetFuelGunByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<FuelGunListDto> Handle(GetFuelGunByIdRequest request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.FuelGuns.GetFuelGunById(request.FuelGunId);
        }
    }
}