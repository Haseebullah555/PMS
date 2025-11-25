using Application.Dtos;
using MediatR;

namespace Application.Features.FuelType.Requests.Queries
{
    public class GetListOfFuelTypesRequest : IRequest<List<FuelTypeDto>>
    {
    }
}