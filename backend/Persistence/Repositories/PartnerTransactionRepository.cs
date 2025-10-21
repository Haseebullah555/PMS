using Application.Contracts.Interfaces;
using Application.Dtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class PartnerTransactionRepository : GenericRepository<PartnerTransaction>, IPartnerTransactionRepository
    {
        private readonly AppDbContext _context;
        public PartnerTransactionRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<PartnerTransactionDto>> GetListOfPartnerTransactions()
        {
            var partnerTransactions = await (from pt in _context.PartnerTransactions
                                       join p in _context.Partners on pt.PartnerId equals p.Id
                                       select new PartnerTransactionDto
                                       {
                                           Id = pt.Id,
                                           PartnerId = pt.PartnerId,
                                           Partner = p.FullName,
                                           Amount = pt.Amount,
                                           Type = pt.Type,
                                           Date = pt.Date
                                       }).ToListAsync();
            return partnerTransactions;
        }
    }
}