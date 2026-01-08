using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Commands.Queries
{
    public class CreateFuelGunCommand : IRequest
    {
        public FuelGunListDto FuelGunDto { get; set; }
    }
}