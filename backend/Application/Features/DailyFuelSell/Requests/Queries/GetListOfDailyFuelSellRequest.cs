using Application.Dtos;
using Application.Dtos.Common;
using MediatR;

namespace Application.Features.DailyFuelSell.Requests.Queries
{
    public class GetListOfDailyFuelSellRequest : IRequest<PaginatedResult<DailyFuelSellListDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}