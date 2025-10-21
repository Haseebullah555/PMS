namespace Application.Contracts.Interfaces.Common
{
    public interface IUnitOfWork : IDisposable
    {
        public ICustomerRepository Customers { get; }
        public ISupplierRepository Suppliers { get; }
        public IGoodRepository Goods { get; }
        public IExtraExpensesRepository ExtraExpenses { get; }
        public IPartnerRepository Partners { get; }
        public IPartnerTransactionRepository PartnerTransactions { get; }
        public IStaffRepository Staffs { get; }
        public IStaffPaymentRepository StaffPayments { get; }
        Task SaveChanges(CancellationToken cancellationToken);
    }
}