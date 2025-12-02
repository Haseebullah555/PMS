using Application.Dtos;
using Application.Dtos.UserManagement;
using MediatR;

namespace Application.Features.FuelStand.Commands.Queries
{
    public class CreateFuelStandCommand : IRequest
    {
        public CreateFuelStandDto FuelStandDto { get; set; }
    }
}