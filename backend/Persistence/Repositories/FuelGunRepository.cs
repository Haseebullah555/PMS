
using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelGunRepository : GenericRepository<FuelGun>, IFuelGunRepository
    {
        public FuelGunRepository(AppDbContext context) : base(context)
        {
        }
    }
}