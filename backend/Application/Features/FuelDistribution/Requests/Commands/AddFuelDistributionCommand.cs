using Application.Dtos.FuelDistributionDtos;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Commands
{
    public class AddFuelDistributionCommand : IRequest
    {
        public AddFuelDistributionDto AddFuelDistributionDto { get; set; }
    }
}