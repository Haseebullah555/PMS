using Application.Dtos;
using MediatR;

namespace Application.Features.FuelType.Requests.Queries
{
    public class GetFuelTypeByIdRequest : IRequest<FuelTypeDto>
    {
        public int FuelTypeId { get; set; }
    }
}