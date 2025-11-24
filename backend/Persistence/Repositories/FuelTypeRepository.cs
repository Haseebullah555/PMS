using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelTypeRepository : GenericRepository<FuelTypes>, IFuelTypeRepository
    {
        public FuelTypeRepository(AppDbContext context) : base(context)
        {
        }
    }
}