using Application.Dtos.FuelDistribution;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Commands
{
    public class UpdateFuelDistributionCommand : IRequest
    {
        public UpdateFuelDistributionDto UpdateFuelDistributionDto { get; set; }
    }
}