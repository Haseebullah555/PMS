using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class CurrencyRepository : GenericRepository<Currency>, ICurrencyRepository
    {
        public CurrencyRepository(AppDbContext context) : base(context)
        {
        }
    }
}