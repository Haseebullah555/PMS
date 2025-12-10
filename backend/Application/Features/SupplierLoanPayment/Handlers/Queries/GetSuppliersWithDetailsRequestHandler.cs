using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Features.Purchase.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Purchase.Handlers.Queries
{
    public class GetSuppliersWithDetailsRequestHandler : IRequestHandler<GetSuppliersWithDetailsRequest, PaginatedResult<SupplierDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetSuppliersWithDetailsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<SupplierDto>> Handle(GetSuppliersWithDetailsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.SupplierLoanPayments.GetSuppliersWithDetails();


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
            var purchases = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            // Map to DTO
            var supplierDtos = _mapper.Map<List<SupplierDto>>(purchases);

            return new PaginatedResult<SupplierDto>
            {
            Data = supplierDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}