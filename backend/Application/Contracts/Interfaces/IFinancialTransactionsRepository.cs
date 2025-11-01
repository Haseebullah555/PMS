using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFinancialTransactionsRepository : IGenericRepository<FinancialTransaction>
    {
        Task<decimal> GetAvailableFundAsync();
    }
}