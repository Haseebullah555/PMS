using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class PurchaseRepository : GenericRepository<Purchase>, IPurchaseRepository
    {
        private readonly AppDbContext _context;
        public PurchaseRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Purchase> GetListOfPurchases()
        {
            return _context.Purchases
            .Include(p => p.Supplier)
            .Include(p => p.PurchaseDetails)
                .ThenInclude(d => d.FuelType)
            .AsQueryable();
        }
    }
}