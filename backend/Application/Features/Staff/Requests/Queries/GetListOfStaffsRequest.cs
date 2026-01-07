using Application.Dtos.Common;
using Application.Dtos.StaffDtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetListOfStaffsRequest : IRequest<PaginatedResult<StaffDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}