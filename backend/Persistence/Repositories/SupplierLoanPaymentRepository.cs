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
                .Include(s => s.Purchases)
                    .ThenInclude(p => p.PurchaseDetails)
                        .ThenInclude(d => d.FuelType)
                .Include(s => s.SupplierLoanPayments);
        }
        public IQueryable<Supplier> GetSuppliersWithSupplierLoanPayments()
        {
            return _context.Suppliers
                .Include(s => s.SupplierLoanPayments);
        }

    }
}