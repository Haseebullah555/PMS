using Application.Contracts.Interfaces;
using Application.Dtos.ReportDtos.FuelSummary;
using Microsoft.EntityFrameworkCore;
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

        public async Task<DailyFuelDynamicDto> GetFuelSummary(DateOnly fromDate, DateOnly toDate)
        {
            // =========================
            // 1️⃣ SALES (PER DAY)
            // =========================
            var salesData = await _context.DailyFuelSells
                .Where(x => x.Date >= fromDate && x.Date <= toDate)
                .Select(x => new
                {
                    x.Date,
                    FuelTypeName = x.FuelType!.Name,
                    Quantity = x.SoldFuelAmount
                })
                .ToListAsync();

            var sales = salesData
                .GroupBy(x => x.Date)
                .Select(g => new DailyFuelSalesDto
                {
                    Date = g.Key,
                    Sold = g
                        .GroupBy(x => x.FuelTypeName)
                        .ToDictionary(
                            fg => fg.Key,
                            fg => fg.Sum(x => x.Quantity)
                        )
                })
                .OrderBy(x => x.Date)
                .ToList();

            // =========================
            // 2️⃣ PURCHASES (DATE RANGE)
            // =========================
            var purchases = await _context.Purchases
                .Where(p => p.PurchaseDate >= fromDate && p.PurchaseDate <= toDate)
                .SelectMany(p => p.PurchaseDetails)
                .GroupBy(d => d.FuelType!.Name)
                .ToDictionaryAsync(
                    g => g.Key,
                    g => g.Sum(x => x.Quantity)
                );

            // =========================
            // 3️⃣ STOCK (CURRENT)
            // =========================
            var stock = await _context.Stocks
                .GroupBy(s => s.FuelType!.Name)
                .ToDictionaryAsync(
                    g => g.Key,
                    g => g.Sum(x => x.QuantityInLiter)
                );

            return new DailyFuelDynamicDto
            {
                Sales = sales,
                Purchases = purchases,
                Stock = stock
            };
        }
    }
}