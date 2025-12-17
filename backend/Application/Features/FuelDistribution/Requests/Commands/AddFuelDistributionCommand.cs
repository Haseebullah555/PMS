using Application.Dtos;
using Application.Dtos.FuelDistribution;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Commands
{
    public class AddFuelDistributionCommand : IRequest
    {
        public AddFuelDistributionDto AddFuelDistributionDto { get; set; }
    }
}