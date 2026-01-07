using Application.Dtos;
using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Commands
{
    public class UpdateFuelGunCommand : IRequest
    {
        public FuelGunDto FuelGunDto { get; set; }
    }
}