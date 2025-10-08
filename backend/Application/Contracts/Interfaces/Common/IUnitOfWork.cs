namespace Application.Contracts.Interfaces.Common
{
    public interface IUnitOfWork : IDisposable
    {
        public ICustomerRepository Customers { get; }
        public ISupplierRepository Suppliers { get; }
        public IGoodRepository Goods { get; }
        public IExtraExpensesRepository ExtraExpenses { get; }
        Task SaveChanges(CancellationToken cancellationToken);
    }
}