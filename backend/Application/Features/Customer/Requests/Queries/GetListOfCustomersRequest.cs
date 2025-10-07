using Application.Dtos;
using Application.Dtos.Common;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetListOfCustomersRequest : IRequest<PaginatedResult<CustomerDto>>
    {
         public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}