using Application.Dtos.FuelStandDtos;
using MediatR;

namespace Application.Features.FuelStand.Requests.Commands
{
    public class UpdateFuelStandCommand : IRequest
    {
        public UpdateFuelStandDto UpdateFuelStandDto { get; set; }
    }
}