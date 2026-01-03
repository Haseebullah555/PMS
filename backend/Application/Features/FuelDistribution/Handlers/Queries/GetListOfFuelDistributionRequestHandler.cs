using Application.Contracts.Interfaces.Common;
using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;
using Application.Features.FuelDistribution.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.FuelDistribution.Handlers.Queries
{
    public class GetListOfFuelDistributionRequestHandler : IRequestHandler<GetListOfFuelDistributionRequest, PaginatedResult<FuelDistributionDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelDistributionRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<FuelDistributionDto>> Handle(GetListOfFuelDistributionRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.FuelDistributions.GetListOfFuelDistributions();

            // Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(s => s.DistributionDate.ToString().Contains(request.Search));
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(request.SortField))
            {
                if (request.SortField.Equals("quantity", StringComparison.OrdinalIgnoreCase))
                {
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Quantity)
                        : query.OrderBy(s => s.Quantity);
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
            var fuelDistributionDtos = _mapper.Map<List<FuelDistributionDto>>(queryResult);

            return new PaginatedResult<FuelDistributionDto>
            {
                Data = fuelDistributionDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }

    }
}