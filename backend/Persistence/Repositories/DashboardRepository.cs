using Application.Contracts.Interfaces;
using Application.Dtos.Dashboard;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Helpers;

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
            int currentShamsiYear = ShamsiDateHelper.GetShamsiYear(DateTime.Now);

            var rawData = await _context.DailyFuelSells
                .Include(x => x.FuelType)
                .Where(x => x.Date != null)
                .ToListAsync(); // 👈 switch to memory

            var result = rawData
                .Where(x =>
                    ShamsiDateHelper.GetShamsiYear(
                        x.Date!.ToDateTime(TimeOnly.MinValue)
                    ) == currentShamsiYear
                )
                .GroupBy(x => new
                {
                    x.FuelTypeId,
                    x.FuelType!.Name,
                    Month = ShamsiDateHelper.GetShamsiMonth(
                        x.Date!.ToDateTime(TimeOnly.MinValue)
                    )
                })
                .Select(g => new DashboardChartDto
                {
                    FuelTypeId = g.Key.FuelTypeId,
                    FuelTypeName = g.Key.Name,
                    ShamsiYear = currentShamsiYear,
                    ShamsiMonth = g.Key.Month,
                    TotalSoldAmount = g.Sum(x => x.SoldFuelAmount)
                })
                .OrderBy(x => x.ShamsiMonth)
                .ToList();

            return result;
        }

        public Task<List<DashboardAviliableStockDto>> GetAviliableStocks()
        {
            var result = _context.Stocks
                .Include(x => x.FuelType)
                .Select(x => new DashboardAviliableStockDto
                {
                    FuelTypeId = x.FuelTypeId,
                    FuelTypeName = x.FuelType!.Name,
                    Amount = x.QuantityInLiter
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<DashboardDailySalesDto>> GetDailyFuelTypeSales()
        {
            int today = DateOnly.FromDateTime(DateTime.Now).Day;

            var rawData = await _context.DailyFuelSells
                .Include(x => x.FuelType)
                .Where(x => x.Date != null)
                .ToListAsync(); // 👈 switch to memory

            var result = rawData
                .Where(x =>
                    x.Date!.ToDateTime(TimeOnly.MinValue).Day == today
                )
                .GroupBy(x => new
                {
                    x.FuelTypeId,
                    x.FuelType!.Name,
                    Today = today,
                })
                .Select(g => new DashboardDailySalesDto
                {
                    FuelTypeId = g.Key.FuelTypeId,
                    FuelTypeName = g.Key.Name,
                    Today = today,
                    FuelUnitPrice = g.First().FuelUnitPrice,
                    TotalSoldAmount = g.Sum(x => x.SoldFuelAmount)
                })
                .OrderBy(x => x.Today)
                .ToList();

            return result;
        }

        public async Task<decimal> GetDailyProfit()
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var totalIn = await _context.FinancialTransactions
                .Where(t => t.Date == today && t.Direction == "IN")
                .SumAsync(t => t.Amount);

            var totalOut = await _context.FinancialTransactions
                .Where(t => t.Date == today && t.Direction == "OUT")
                .SumAsync(t => t.Amount);
            

            return totalIn - totalOut;
        }

    }
}