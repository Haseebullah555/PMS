using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class CustomerLoanRepository : GenericRepository<CustomerLoan>, ICustomerLoanRepository
    {
        private readonly AppDbContext _context;
        public CustomerLoanRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<CustomerLoan?> GetCustomerLoanByIdAsync(int customerLoanId)
        {
             return await _context.CustomerLoans
                .FirstOrDefaultAsync(c => c.Id == customerLoanId);
        }
    }
}