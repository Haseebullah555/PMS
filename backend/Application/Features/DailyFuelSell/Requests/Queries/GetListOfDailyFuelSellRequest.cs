using Application.Dtos.Common;
using Application.Dtos.DailyFuelSellDtos;
using MediatR;

namespace Application.Features.DailyFuelSell.Requests.Queries
{
    public class GetListOfDailyFuelSellRequest : IRequest<PaginatedResult<DailyFuelSellDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}