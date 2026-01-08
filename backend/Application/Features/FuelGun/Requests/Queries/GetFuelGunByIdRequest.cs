using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Queries
{
    public class GetFuelGunByIdRequest : IRequest<FuelGunListDto>
    {
        public int FuelGunId { get; set; }
    }
}