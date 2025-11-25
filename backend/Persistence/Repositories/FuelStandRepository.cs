using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelStandRepository : GenericRepository<FuelStand>, IFuelStandRepository
    {
        public FuelStandRepository(AppDbContext context) : base(context)
        {
        }
    }
}