using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class SupplierLoanPaymentRepository : GenericRepository<SupplierLoanPayment>, ISupplierLoanPaymentRepository
    {
        public SupplierLoanPaymentRepository(AppDbContext context) : base(context)
        {
        }
    }
}