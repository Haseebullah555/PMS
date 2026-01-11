using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface ICustomerRepository : IGenericRepository<Customer>
    {
        Task<Customer?> GetCustomerByIdAsync(int customerId);
        IQueryable<Customer?> GetCustomersWithDetails();
    }
}