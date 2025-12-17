using Application.Contracts.Interfaces;
using Domain.Models;
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
    }
}