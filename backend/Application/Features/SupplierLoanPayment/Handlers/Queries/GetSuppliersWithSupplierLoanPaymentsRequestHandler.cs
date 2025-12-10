using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Features.Purchase.Requests.Queries;
using Application.Features.SupplierLoanPayment.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Purchase.Handlers.Queries
{
    public class GetSuppliersWithSupplierLoanPaymentsRequestHandler : IRequestHandler<GetSuppliersWithSupplierLoanPaymentsRequest, PaginatedResult<SuppliersWithSupplierLoanPaymentsDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetSuppliersWithSupplierLoanPaymentsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<SuppliersWithSupplierLoanPaymentsDto>> Handle(GetSuppliersWithSupplierLoanPaymentsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.SupplierLoanPayments.GetSuppliersWithSupplierLoanPayments();


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
            var suppliers = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            // Map to DTO
            var supplierDtos = _mapper.Map<List<SuppliersWithSupplierLoanPaymentsDto>>(suppliers);

            return new PaginatedResult<SuppliersWithSupplierLoanPaymentsDto>
            {
            Data = supplierDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}