using Application.Dtos.FuelDistributionDtos;
using MediatR;

namespace Application.Features.FuelStand.Requests.Queries
{
    public class GetFuelStandWithDetialsRequest : IRequest<List<GetFuelStandWithDetialsDto>>
    {
    }
}