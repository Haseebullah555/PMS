using Application.Dtos.FuelTypeDtos;
using MediatR;

namespace Application.Features.FuelType.Commands.Queries
{
    public class CreateFuelTypeCommand : IRequest
    {
        public AddFuelTypeDto AddFuelTypeDto { get; set; }
    }
}