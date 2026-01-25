using Microsoft.EntityFrameworkCore.Storage;

namespace Application.Contracts.Interfaces.Common
{
    public interface IUnitOfWork : IDisposable
    {
        public IDashboardRepository Dashboards { get; }
        public ICustomerRepository Customers { get; }
        public ICustomerLoanRepository CustomerLoans { get; }
        public ICustomerLoanPaymentRepository CustomerLoanPayments { get; }
        public ISupplierRepository Suppliers { get; }
        public IFuelTypeRepository FuelTypes { get; }
        public IFuelGunRepository FuelGuns { get; }
        public IFuelStandRepository FuelStands { get; }
        public IExtraExpensesRepository ExtraExpenses { get; }
        public IPartnerRepository Partners { get; }
        public IPartnerTransactionRepository PartnerTransactions { get; }
        public IStaffRepository Staffs { get; }
        public IStaffPaymentRepository StaffPayments { get; }
        public IFinancialTransactionsRepository FinancialTransactions { get; }
        public IPurchaseRepository Purchases { get; }
        public IPurchaseDetailsRepository PurchaseDetails { get; }
        public IStockRepository Stocks { get; }
        public ISupplierLoansRepository SupplierLoans { get; }
        public ISupplierLoanPaymentRepository SupplierLoanPayments { get; }
        public IDailyFuelSellRepository DailyFuelSells { get; }

        public IStudentRespository Students { get; }
        Task SaveAsync(CancellationToken cancellationToken);
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}