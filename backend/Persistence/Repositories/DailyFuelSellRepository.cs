using Application.Contracts.Interfaces;
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

        public IQueryable<DailyFuelSell> ListOfDailyFuelSell()
        {
                var result = _context.DailyFuelSells
                            .Include(dfs => dfs.FuelStand)
                            .Include(dfs => dfs.FuelGun)
                            .AsQueryable();
                return result;
        }
    }
}