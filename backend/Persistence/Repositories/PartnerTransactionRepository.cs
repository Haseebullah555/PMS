using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class PartnerTransactionRepository : GenericRepository<PartnerTransaction>, IPartnerTransactionRepository
    {
        public PartnerTransactionRepository(AppDbContext context) : base(context)
        {
        }
    }
}