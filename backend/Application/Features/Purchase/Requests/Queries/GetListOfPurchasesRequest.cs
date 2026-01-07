using Application.Dtos.Common;
using Application.Dtos.PurchaseDtos;
using MediatR;

namespace Application.Features.Purchase.Requests.Queries
{
    public class GetListOfPurchasesRequest : IRequest<PaginatedResult<PurchaseDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}