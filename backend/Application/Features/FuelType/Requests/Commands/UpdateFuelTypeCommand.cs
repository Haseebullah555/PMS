using Application.Dtos.FuelStandDtos;
using Application.Dtos.FuelTypeDtos;
using MediatR;

namespace Application.Features.FuelType.Requests.Commands
{
    public class UpdateFuelTypeCommand : IRequest
    {
        public UpdateFuelTypeDto UpdateFuelTypeDto { get; set; }
    }
}