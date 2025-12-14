using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{

    public class FuelDistributionRepository : GenericRepository<FuelDistribution>, IFuelDistributionRepository
    {
        public FuelDistributionRepository(AppDbContext context) : base(context)
        {
        }
    }
}

