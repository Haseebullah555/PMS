using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Microsoft.EntityFrameworkCore.Storage;
using Persistence.Database;

namespace Persistence.Repositories.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        #region Private fields
        private ICustomerRepository _customerRepository;
        private ISupplierRepository _supplierRepository;
        private IFuelTypeRepository _fuelTypeRepository;
        private IFuelGunRepository _fuelGunRepository;
        private IFuelStandRepository _fuelStandRepository;
        private IExtraExpensesRepository _extraExpensesRepository;
        private IPartnerRepository _partnerRepository;
        private IPartnerTransactionRepository _partnerTransactionRepository;
        private IStaffRepository _staffRepository;
        private IStaffPaymentRepository _staffPaymentRepository;
        private IFinancialTransactionsRepository _financialTransactionsRepository;
        private IPurchaseRepository _purchaseRepository;
        private IPurchaseDetailsRepository _purchaseDetailsRepository;
        private IStockRepository _stockRepository;
        private ISupplierLoansRepository _supplierLoansRepository;
        private ISupplierLoanPaymentRepository _supplierLoanPaymentRepository;
        private IFuelDistributionRepository _fuelDistributionRepository;
        private IStudentRespository _studentRepository;
        #endregion
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public ICustomerRepository Customers => _customerRepository ??= new CustomerRepository(_context);
        public ISupplierRepository Suppliers => _supplierRepository ??= new SupplierRepository(_context);
        public IFuelTypeRepository FuelTypes => _fuelTypeRepository ??= new FuelTypeRepository(_context);
        public IFuelGunRepository FuelGuns => _fuelGunRepository ??= new FuelGunRepository(_context);
        public IFuelStandRepository FuelStands => _fuelStandRepository ??= new FuelStandRepository(_context);
        public IExtraExpensesRepository ExtraExpenses => _extraExpensesRepository ??= new ExtraExpensesRepository(_context);
        public IPartnerRepository Partners => _partnerRepository ??= new PartnerRepository(_context);
        public IPartnerTransactionRepository PartnerTransactions => _partnerTransactionRepository ??= new PartnerTransactionRepository(_context);
        public IStaffRepository Staffs => _staffRepository ??= new StaffRepository(_context);
        public IStaffPaymentRepository StaffPayments => _staffPaymentRepository ??= new StaffPaymentRepository(_context);
        public IFinancialTransactionsRepository FinancialTransactions => _financialTransactionsRepository ??= new FinancialTransactionsRepository(_context);

        public IPurchaseRepository Purchases => _purchaseRepository ??= new PurchaseRepository(_context);

        public IPurchaseDetailsRepository PurchaseDetails => _purchaseDetailsRepository ??= new PurchaseDetailsRepository(_context);

        public IStockRepository Stocks => _stockRepository ??= new StockRepository(_context);

        public ISupplierLoansRepository SupplierLoans => _supplierLoansRepository ??= new SupplierLoansRepository(_context);
        public ISupplierLoanPaymentRepository SupplierLoanPayments => _supplierLoanPaymentRepository ??= new SupplierLoanPaymentRepository(_context);
        public IFuelDistributionRepository FuelDistributions => _fuelDistributionRepository ??= new FuelDistributionRepository(_context);

        public IStudentRespository Students =>  _studentRepository ??= new StudentRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }


    }
}