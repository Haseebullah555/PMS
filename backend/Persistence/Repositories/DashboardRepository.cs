using Application.Contracts.Interfaces;
using Application.Dtos.Dashboard;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;

namespace Persistence.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<DashboardChartDto>> GetAnnualFuelTypeSales()
        {
            int currentYear = DateTime.UtcNow.Year;

            var result = await _context.DailyFuelSells
                .Where(dfs => dfs.Date.HasValue && dfs.Date.Value.Year == currentYear)
                .Include(dfs => dfs.FuelTypes)
                .GroupBy(dfs => new
                {
                    dfs.FuelTypeId,
                    dfs.FuelTypes.Name,
                    Month = dfs.Date!.Value.Month
                })
                .Select(g => new DashboardChartDto
                {
                    FuelTypeId = g.Key.FuelTypeId,
                    FuelTypeName = g.Key.Name,
                    Month = g.Key.Month,
                    TotalSoldAmount = g.Sum(x => x.SoldFuelAmount)
                })
                .OrderBy(x => x.FuelTypeId)
                .ThenBy(x => x.Month)
                .ToListAsync();

            return result;
        }

    }
}