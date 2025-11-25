using Application.Dtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Commands
{
    public class UpdateFuelGunCommand : IRequest
    {
        public FuelGunDto FuelGunDto { get; set; }
    }
}