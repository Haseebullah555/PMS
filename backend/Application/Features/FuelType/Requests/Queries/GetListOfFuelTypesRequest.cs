using Application.Dtos.Common;
using Application.Dtos.FuelTypeDtos;
using MediatR;

namespace Application.Features.FuelType.Requests.Queries
{
    public class GetListOfFuelTypesRequest : IRequest<PaginatedResult<FuelTypeDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}