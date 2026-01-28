using Application.Contracts.Interfaces;
using Application.Dtos.ReportDtos.FuelSummary;
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

        public async Task<List<FuelSummaryDto>> GetFuelSummary(DateOnly fromDate, DateOnly toDate)
        {
            return _context.DailyFuelSells
                .Where(x => x.Date >= fromDate && x.Date <= toDate)
                .Select(x => new FuelSummaryDto
                {
                    FuelTypeId = x.FuelTypeId,
                    FuelTypeName = x.FuelType!.Name,
                    Date = x.Date,
                    SoldFuelAmount = x.SoldFuelAmount
                })
                .ToList();
        }

    }
}