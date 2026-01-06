using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class CustomerLoanPaymentRepository : GenericRepository<CustomerLoanPayment>, ICustomerLoanPaymentRepository
    {
        public CustomerLoanPaymentRepository(AppDbContext context) : base(context)
        {
        }
    }
}