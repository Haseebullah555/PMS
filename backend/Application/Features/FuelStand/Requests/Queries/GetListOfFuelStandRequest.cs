using Application.Dtos;
using MediatR;

namespace Application.Features.FuelStand.Requests.Queries
{
    public class GetListOfFuelStandsRequest : IRequest<List<FuelStandDto>>
    {
    }
}