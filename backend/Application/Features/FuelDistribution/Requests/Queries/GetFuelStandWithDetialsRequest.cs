using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Queries
{
    public class GetFuelStandWithDetialsRequest : IRequest<List<GetFuelStandWithDetialsDto>>
    {
    }
}