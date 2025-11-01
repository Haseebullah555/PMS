using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FinancialTransactionsRepository : GenericRepository<FinancialTransaction>, IFinancialTransactionsRepository
    {
        private readonly AppDbContext _context;
        public FinancialTransactionsRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<decimal> GetAvailableFundAsync()
        {
            return await _context.FinancialTransactions.SumAsync(f => f.Direction == "IN" ? f.Amount : -f.Amount);
        }
    }
}