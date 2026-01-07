using Application.Contracts.Interfaces.Common;
using Application.Dtos.Common;
using Application.Dtos.DailyFuelSellDtos;
using Application.Features.DailyFuelSell.Requests.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.DailyFuelSell.Handlers.Queries
{
    public class GetListOfDailyFuelSellRequestHandler : IRequestHandler<GetListOfDailyFuelSellRequest, PaginatedResult<DailyFuelSellDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetListOfDailyFuelSellRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<PaginatedResult<DailyFuelSellDto>> Handle(GetListOfDailyFuelSellRequest request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.DailyFuelSells.ListOfDailyFuelSell();
            // Search
            // if (!string.IsNullOrWhiteSpace(request.Search))
            // {
            //     query = query.Where(s => s.Name.Contains(request.Search));
            // }

            // Sorting
            if (!string.IsNullOrWhiteSpace(request.SortField))
            {
                if (request.SortField.Equals("name", StringComparison.OrdinalIgnoreCase))
                {
                    // query = request.SortOrder == "desc"
                    //     ? query.OrderByDescending(s => s.Name)
                    //     : query.OrderBy(s => s.Name);
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
            var DailyFuelSells = await query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToListAsync(cancellationToken);

            // Map to DTO
            var dailyFuelSellDtos = DailyFuelSells.Select(fs => new DailyFuelSellDto
            {
                Id = fs.Id,
                FuelStandId = fs.FuelStandId,
                FuelStand = fs.FuelStand.Name,
                StaffId = fs.StaffId,
                FuelGunId = fs.FuelGunId,
                FuelGun = fs.FuelGun.Name,
                CurrentMeterDegree = fs.CurrentMeterDegree,
                OldMeterDegree = fs.OldMeterDegree,
                SoldFuelAmount = fs.SoldFuelAmount,
                FuelUnitPrice = fs.FuelUnitPrice,
                TotalPrice = fs.TotalPrice,
                CollectedMoney = fs.CollectedMoney,
                Date = fs.Date,
                Note = fs.Note,
            }).ToList();

            return new PaginatedResult<DailyFuelSellDto>
            {
                Data = dailyFuelSellDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }

    }
}