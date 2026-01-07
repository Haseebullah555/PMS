using Application.Dtos;
using Application.Dtos.Common;
using Application.Dtos.StaffPaymentDtos;
using MediatR;

namespace Application.Features.StaffPayments.Requests.Queries
{
    public class GetListOfStaffPaymentsRequest : IRequest<PaginatedResult<StaffPaymentDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}