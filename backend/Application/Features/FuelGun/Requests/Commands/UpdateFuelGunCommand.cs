using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Commands
{
    public class UpdateFuelGunCommand : IRequest
    {
        public FuelGunListDto FuelGunDto { get; set; }
    }
}