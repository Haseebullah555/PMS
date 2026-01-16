using Application.Dtos.FuelStandDtos;
using MediatR;

namespace Application.Features.FuelStand.Commands.Queries
{
    public class CreateFuelStandCommand : IRequest
    {
        public FuelStandDto FuelStandDto { get; set; }
    }
}