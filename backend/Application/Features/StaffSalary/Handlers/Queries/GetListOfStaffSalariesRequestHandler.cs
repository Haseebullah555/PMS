using System.Linq;
using System.Runtime.Serialization;
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
            var items = await _unitOfWork.StaffSalaries.GetAllStaffSalariesAsync();

            var query = items.AsEnumerable();

            // Search
            if (!string.IsNullOrWhiteSpace(request.Search) && int.TryParse(request.Search, out var search))
            {
                query = query.Where(s => s.StaffId == search);
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
                query = query.OrderBy(s => s.Id);
            }

            // Count and pagination
            var total = query.Count();

            var salaries = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            var salaryDtos = _mapper.Map<List<StaffSalaryDto>>(salaries);

            return new PaginatedResult<StaffSalaryDto>
            {
                Data = salaryDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };


        }
    }
}