using Application.Dtos.FuelDistributionDtos;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Queries
{
    public class GetFuelStandWithDetialsRequest : IRequest<List<GetFuelStandWithDetialsDto>>
    {
    }
}