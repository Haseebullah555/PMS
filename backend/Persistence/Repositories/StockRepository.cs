using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StockRepository : GenericRepository<Stock>, IStockRepository
    {
        private readonly AppDbContext _context;
        public StockRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Stock> GetAllStockItems()
        {
            return _context.Stocks
                .Include(s => s.FuelType)
                .AsQueryable();
        }

        public async Task<Stock?> GetByFuelTypeIdAsync(int fuelTypeId)
        {
            return await _context.Stocks
     .FirstOrDefaultAsync(s => s.FuelTypeId == fuelTypeId);
        }

    }
}