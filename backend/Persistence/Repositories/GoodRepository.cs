using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class GoodRepository : GenericRepository<Good>, IGoodRepository
    {
        public GoodRepository(AppDbContext context) : base(context)
        {
        }
    }
}