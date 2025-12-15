using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    }
}

