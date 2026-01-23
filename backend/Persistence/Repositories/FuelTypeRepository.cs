using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelTypeRepository : GenericRepository<FuelType>, IFuelTypeRepository
    {
        public FuelTypeRepository(AppDbContext context) : base(context)
        {
        }
    }
}