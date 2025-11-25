using Application.Dtos;
using MediatR;

namespace Application.Features.FuelStand.Requests.Commands
{
    public class UpdateFuelStandCommand : IRequest
    {
        public FuelStandDto FuelStandDto { get; set; }
    }
}