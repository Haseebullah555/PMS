using Application.Dtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Queries
{
    public class GetListOfFuelGunsRequest : IRequest<List<FuelGunDto>>
    {
    }
}