using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;
using Application.Features.FuelDistribution.Requests.Queries;
using Application.Features.Purchase.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.FuelDistribution.Handlers.Queries
{
    public class GetFuelStandWithDetialsRequestHandler : IRequestHandler<GetFuelStandWithDetialsRequest, PaginatedResult<GetFuelStandWithDetialsDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetFuelStandWithDetialsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<GetFuelStandWithDetialsDto>> Handle(GetFuelStandWithDetialsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.FuelDistributions.GetFuelStandWithDetails();

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
            var queryResult = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            // Map to DTO
            var fuelStantWithDetialsDtos = _mapper.Map<List<GetFuelStandWithDetialsDto>>(queryResult);

            return new PaginatedResult<GetFuelStandWithDetialsDto>
            {
                Data = fuelStantWithDetialsDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}