using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{

    public class FuelDistributionRepository : GenericRepository<FuelDistribution>, IFuelDistributionRepository
    {
        private readonly AppDbContext _context;
        public FuelDistributionRepository(AppDbContext context) : base(context)
        {
            _context = context;

        }
        public IQueryable<FuelStand> GetFuelStandWithDetails()
        {
            return _context.FuelStands
                .Include(s => s.FuelGuns)
                    .ThenInclude(p => p.FuelDistributions);
            // .ThenInclude(d => d.FuelType);
        }
        public async Task<FuelDistribution?> GetLastRecordByFuelGunId(int fuelGunId)
        {
            var data = await _context.FuelDistributions
         .Where(s => s.FuelGunId == fuelGunId)
         .OrderByDescending(s => s.Id)   // or CreatedAt if you have it
         .FirstOrDefaultAsync();
            return data;
        }

        public IQueryable<FuelDistribution> GetListOfFuelDistributions()
        {
            var result = _context.FuelDistributions
            .Include(fd=> fd.FuelType)
            .Include(fd => fd.FuelGun)
            .AsQueryable();
            return result;
        }

    }
}

