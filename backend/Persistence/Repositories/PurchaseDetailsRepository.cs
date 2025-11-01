using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class PurchaseDetailsRepository : GenericRepository<PurchaseDetail>, IPurchaseDetailsRepository
    {
        public PurchaseDetailsRepository(AppDbContext context) : base(context)
        {
        }
    }
}