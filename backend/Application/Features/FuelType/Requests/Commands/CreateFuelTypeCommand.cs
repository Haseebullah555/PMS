using Application.Dtos;
using MediatR;

namespace Application.Features.FuelType.Commands.Queries
{
    public class CreateFuelTypeCommand : IRequest
    {
        public FuelTypeDto FuelTypeDto { get; set; }
    }
}