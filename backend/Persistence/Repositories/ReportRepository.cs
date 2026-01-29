using Application.Contracts.Interfaces;
using Application.Dtos.ReportDtos.FuelSummary;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Persistence.Database;

namespace Persistence.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly AppDbContext _context;

        public ReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DailyFuelDynamicDto>> GetFuelSummary(DateOnly fromDate, DateOnly toDate)
        {
            // return _context.DailyFuelSells
            //     .Where(x => x.Date >= fromDate && x.Date <= toDate)
            //     .Select(x => new FuelSummaryDto
            //     {
            //         FuelTypeId = x.FuelTypeId,
            //         FuelTypeName = x.FuelType!.Name,
            //         Date = x.Date,
            //         SoldFuelAmount = x.SoldFuelAmount
            //     })
            //     .ToList();
            var rawData = await _context.DailyFuelSells
                .Where(x => x.Date >= fromDate && x.Date <= toDate)
                .Select(x => new
                {
                    x.Date,
                    FuelTypeName = x.FuelType!.Name,
                    x.SoldFuelAmount
                })
                .ToListAsync();

            // Step 2: Pivot dynamically
            var result = rawData
                .GroupBy(x => x.Date)
                .Select(g => new DailyFuelDynamicDto
                {
                    Date = g.Key,
                    FuelTypes = g
                        .GroupBy(x => x.FuelTypeName)
                        .ToDictionary(
                            fg => fg.Key,
                            fg => fg.Sum(x => x.SoldFuelAmount)
                        )
                })
                .OrderBy(x => x.Date)
                .ToList();

            return result;
        }
    }
}