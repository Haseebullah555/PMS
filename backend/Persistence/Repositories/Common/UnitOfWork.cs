using Application.Contracts;
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
        private IGoodRepository _goodRepository;
        private IExtraExpensesRepository _extraExpensesRepository;
        private IPartnerRepository _partnerRepository;
        private IPartnerTransactionRepository _partnerTransactionRepository;
        private IStaffRepository _staffRepository;
        private IStaffPaymentRepository _staffPaymentRepository;
        #endregion
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public ICustomerRepository Customers => _customerRepository ??= new CustomerRepository(_context);
        public ISupplierRepository Suppliers => _supplierRepository ??= new SupplierRepository(_context);
        public IGoodRepository Goods => _goodRepository ??= new GoodRepository(_context);
        public IExtraExpensesRepository ExtraExpenses => _extraExpensesRepository ??= new ExtraExpensesRepository(_context);
        public IPartnerRepository Partners => _partnerRepository ??= new PartnerRepository(_context);
        public IPartnerTransactionRepository PartnerTransactions => _partnerTransactionRepository ??= new PartnerTransactionRepository(_context);
        public IStaffRepository Staffs => _staffRepository ??= new StaffRepository(_context);
        public IStaffPaymentRepository StaffPayments => _staffPaymentRepository ??= new StaffPaymentRepository(_context);

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