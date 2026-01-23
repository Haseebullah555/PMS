using Application.Contracts.Interfaces;
using Application.Dtos.ReportDtos.DailyFuelSellReportDtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class DailyFuelRepository : GenericRepository<DailyFuelSell>, IDailyFuelSellRepository
    {
        private readonly AppDbContext _context;
        public DailyFuelRepository(AppDbContext context) : base(context)
        {
            _context = context;

        }
        public async Task<List<DailyFuelSellReportDto>> GetDailyFuelSalesAsync(DateOnly? fromDate, DateOnly? toDate, CancellationToken cancellationToken)
        {
            var query = _context.DailyFuelSells.AsNoTracking();

            if (fromDate.HasValue)
                query = query.Where(x => x.Date >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(x => x.Date <= toDate.Value);

            return await query
                .GroupBy(x => x.Date)
                .Select(g => new DailyFuelSellReportDto
                {
                    Date = (DateOnly)g.Key,
                    TotalQuantity = g.Sum(x => x.SoldFuelAmount),
                    TotalAmount = g.Sum(x => x.TotalPrice)
                })
                .OrderBy(x => x.Date)
                .ToListAsync(cancellationToken);
        }
        public IQueryable<DailyFuelSell> ListOfDailyFuelSell()
        {
            var result = _context.DailyFuelSells
                        .Include(dfs => dfs.FuelStand)
                        .Include(dfs => dfs.FuelGun)
                        .Include(dfs => dfs.FuelType)
                        .Include(dfs => dfs.Staff)
                        .AsQueryable();
            return result;
        }
    }
}