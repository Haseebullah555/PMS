using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface ISupplierLoanPaymentRepository : IGenericRepository<SupplierLoanPayment>
    {
        IQueryable<Supplier> GetSuppliersWithDetails();
        
        Task<Supplier?> GetSupplierByIdAsync(int supplierId);
    }
}