using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Queries
{
    public class GetFuelGunByIdRequest : IRequest<FuelGunDto>
    {
        public int FuelGunId { get; set; }
    }
}