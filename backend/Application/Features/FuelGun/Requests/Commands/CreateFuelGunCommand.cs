using Application.Dtos;
using MediatR;

namespace Application.Features.FuelGun.Commands.Queries
{
    public class CreateFuelGunCommand : IRequest
    {
        public FuelGunDto FuelGunDto { get; set; }
    }
}