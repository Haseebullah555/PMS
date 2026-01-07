using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Dtos.FuelGunDtos;
using Application.Features.FuelGun.Requests.Queries;
using AutoMapper;
using MediatR;
namespace Application.Features.FuelGun.Handlers.Queries
{
    public class GetListOfFuelGunsRequestHandler : IRequestHandler<GetListOfFuelGunsRequest, PaginatedResult<FuelGunDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfFuelGunsRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<PaginatedResult<FuelGunDto>> Handle(GetListOfFuelGunsRequest request, CancellationToken cancellationToken)
        {
            // Await the repository task first, then operate on the resulting in-memory list as IQueryable
            var query = _unitOfWork.FuelGuns.Query();

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
                // Default sort
                query = query.OrderBy(s => s.Id);
            }

            // Total count (before pagination) - use synchronous Count since this is an in-memory IQueryable
            var total = query.Count();

            // Pagination
            var fuelGuns = query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToList();

            // Map to DTO
            var fuelGunDtos = _mapper.Map<List<FuelGunDto>>(fuelGuns);

            return new PaginatedResult<FuelGunDto>
            {
                Data = fuelGunDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }
    }
}