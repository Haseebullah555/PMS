using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Features.StaffPayments.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.StaffPayments.Handlers.Queries
{
    public class GetListOfStaffPaymentsRequestHandler : IRequestHandler<GetListOfStaffPaymentsRequest, PaginatedResult<StaffPaymentDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfStaffPaymentsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<StaffPaymentDto>> Handle(GetListOfStaffPaymentsRequest request, CancellationToken cancellationToken)
        {
            var items = await _unitOfWork.StaffPayments.GetAllStaffPaymentsAsync();

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
                        ? query.OrderByDescending(s => s.PaidAmount)
                        : query.OrderBy(s => s.PaidAmount);
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

            var salaryDtos = _mapper.Map<List<StaffPaymentDto>>(salaries);

            return new PaginatedResult<StaffPaymentDto>
            {
                Data = salaryDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };


        }
    }
}