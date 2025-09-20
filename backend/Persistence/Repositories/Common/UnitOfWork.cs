using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Persistence.Database;

namespace Persistence.Repositories.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        #region Private fields
        private ICustomerRepository _customerRepository;
        private ISupplierRepository _supplierRepository;
        #endregion
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public ICustomerRepository Customers => _customerRepository ??= new CustomerRepository(_context);

        public ISupplierRepository Suppliers => _supplierRepository ??= new SupplierRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
        public async Task SaveChanges(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }


    }
}