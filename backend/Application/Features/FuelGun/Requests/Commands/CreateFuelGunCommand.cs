using Application.Dtos;
using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Commands.Queries
{
    public class CreateFuelGunCommand : IRequest
    {
        public FuelGunDto FuelGunDto { get; set; }
    }
}