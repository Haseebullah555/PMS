using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;
using MediatR;

namespace Application.Features.FuelDistribution.Requests.Queries
{
    public class GetListOfFuelDistributionRequest : IRequest<PaginatedResult<FuelDistributionDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}