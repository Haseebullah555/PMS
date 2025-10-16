using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetListOfStaffSalarysRequestHandler : IRequestHandler<GetListOfStaffSalarysRequest, PaginatedResult<StaffSalaryDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfStaffSalarysRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<StaffSalaryDto>> Handle(GetListOfStaffSalarysRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.StaffSalaries.GetAll();

            // Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(s => s.Date.ToString().Contains(request.Search));
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(request.SortField))
            {
                if (request.SortField.Equals("fullName", StringComparison.OrdinalIgnoreCase))
                {
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Amount)
                        : query.OrderBy(s => s.Amount);
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
            var suppliers = await query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToListAsync(cancellationToken);

            // Map to DTO
            var supplierDtos = _mapper.Map<List<StaffSalaryDto>>(suppliers);

            return new PaginatedResult<StaffSalaryDto>
            {
                Data = supplierDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}