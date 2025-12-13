using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class SupplierLoanPaymentRepository : GenericRepository<SupplierLoanPayment>, ISupplierLoanPaymentRepository
    {
        private readonly AppDbContext _context;
        public SupplierLoanPaymentRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public IQueryable<Supplier> GetSuppliersWithDetails()
        {
            return _context.Suppliers
                // .Where(s => s.Purchases.Any(p => p.UnPaidAmount > 0))
                .Include(s => s.SupplierLoanPayments)
                .Include(s => s.Purchases)
                    .ThenInclude(p => p.PurchaseDetails)
                        .ThenInclude(d => d.FuelType);
        }

        public async Task<Supplier?> GetSupplierByIdAsync(int supplierId)
        {
            return await _context.Suppliers
                .FirstOrDefaultAsync(s => s.Id == supplierId);
        }
    }
}