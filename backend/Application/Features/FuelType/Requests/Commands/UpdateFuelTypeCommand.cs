using Application.Dtos;
using MediatR;

namespace Application.Features.FuelType.Requests.Commands
{
    public class UpdateFuelTypeCommand : IRequest
    {
        public FuelTypeDto FuelTypeDto { get; set; }
    }
}