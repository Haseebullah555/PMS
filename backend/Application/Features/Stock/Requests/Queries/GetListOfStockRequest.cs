using Application.Dtos.Common;
using Application.Dtos.StockDtos;
using MediatR;

namespace Application.Features.Stock.Requests.Queries
{
    public class GetListOfStocksRequest : IRequest<PaginatedResult<StockDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}