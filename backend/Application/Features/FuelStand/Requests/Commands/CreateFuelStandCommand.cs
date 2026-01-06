using Application.Dtos;
using MediatR;

namespace Application.Features.FuelStand.Commands.Queries
{
    public class CreateFuelStandCommand : IRequest
    {
        public CreateFuelStandDto CreateFuelStandDto { get; set; }
    }
}