using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class CustomerRepository : GenericRepository<Customer>, ICustomerRepository
    {
        private readonly AppDbContext _context;
        public CustomerRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        // public async Task<Customer?> GetCustomerByIdAsync(int customerId)
        // {
        //     return await _context.Customers
        //         .FirstOrDefaultAsync(c => c.Id == customerId);
        // }

        public IQueryable<Customer?> GetCustomersWithDetails()
        {
            return _context.Customers
                .Include(s => s.CustomerLoans)
                .Include(s => s.CustomerLoanPayments);
        }
    }
}