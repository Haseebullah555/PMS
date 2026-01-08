using Application.Dtos;
using Application.Dtos.Common;
using Application.Dtos.FuelGunDtos;
using MediatR;

namespace Application.Features.FuelGun.Requests.Queries
{
    public class GetListOfFuelGunsRequest : IRequest<PaginatedResult<FuelGunListDto>>
    {
        public string? Search { get; set; }
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}