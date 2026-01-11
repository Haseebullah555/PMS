using Application.Contracts.Interfaces.Common;
using Application.Dtos.Common;
using Application.Dtos.CustomerDtos;
using Application.Features.Customer.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Customer.Handlers.Queries
{
    public class GetCustomersWithDetialsRequestHandler : IRequestHandler<GetCustomersWithDetailsRequest, PaginatedResult<CustomersWithDetailsDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetCustomersWithDetialsRequestHandler(IUnitOfWork unitOfWork, Mapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<CustomersWithDetailsDto>> Handle(GetCustomersWithDetailsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.Customers.GetCustomersWithDetails();


            // Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(s => s.Name.Contains(request.Search));
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(request.SortField))
            {
                if (request.SortField.Equals("name", StringComparison.OrdinalIgnoreCase))
                {
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Name)
                        : query.OrderBy(s => s.Name);
                }
                else if (request.SortField.Equals("id", StringComparison.OrdinalIgnoreCase))
                {
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Id)
                        : query.OrderBy(s => s.Id);
                }
            }
            else
            {
                // Default sort (optional)
                query = query.OrderBy(s => s.Id);
            }
            // Total count (before pagination)
            var total = await query.CountAsync(cancellationToken);

            // Pagination
            var customers = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            // Map to DTO
            var customerDtos = _mapper.Map<List<CustomersWithDetailsDto>>(customers);

            return new PaginatedResult<CustomersWithDetailsDto>
            {
                Data = customerDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }

    }
}