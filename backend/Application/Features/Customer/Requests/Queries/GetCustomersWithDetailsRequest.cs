using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Common;
using Application.Dtos.CustomerDtos;
using MediatR;

namespace Application.Features.Customer.Requests.Queries
{
    public class GetCustomersWithDetailsRequest : IRequest<PaginatedResult<CustomersWithDetailsDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}