using Application.Contracts.Interfaces.Common;
using Application.Dtos.Common;
using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelStandDtos;
using Application.Features.FuelStand.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.FuelStand.Handlers.Queries
{
    public class GetListOfFuelStandsRequestHandler : IRequestHandler<GetListOfFuelStandsRequest, PaginatedResult<FuelStandDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelStandsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<FuelStandDto>> Handle(GetListOfFuelStandsRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.FuelStands.GetAllFuelStands();

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
            var FuelStands = await query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToListAsync(cancellationToken);

            // Map to DTO
            var fuelStandDtos = FuelStands.Select(fs => new FuelStandDto
            {
                Id = fs.Id,
                Name = fs.Name,
                StaffId = fs.StaffId,
                FuelGuns = fs.FuelGuns.Select(g => new FuelGunDto
                {
                    Id = g.Id,
                    Name = g.Name,
                    // FuelTypeId = g.FuelTypeId
                }).ToList()
            }).ToList();

            return new PaginatedResult<FuelStandDto>
            {
                Data = fuelStandDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}