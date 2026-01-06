using Application.Dtos.FuelDistribution;
using MediatR;

namespace Application.Features.FuelStand.Requests.Queries
{
    public class GetFuelStandByIdRequest : IRequest<FuelStandDto>
    {
        public int FuelStandId { get; set; }
    }
}