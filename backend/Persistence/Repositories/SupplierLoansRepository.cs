using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class SupplierLoansRepository : GenericRepository<SupplierLoan>, ISupplierLoansRepository
    {
        public SupplierLoansRepository(AppDbContext context) : base(context)
        {
        }
    }
}