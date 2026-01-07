using Application.Dtos.Common;
using Application.Dtos.ExtraExpenseDtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetListOfExtraExpensesRequest : IRequest<PaginatedResult<ExtraExpensesDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}