using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IStockRepository : IGenericRepository<Stock>
    {
        Task<Stock?> GetByGoodIdAsync(int goodId);
        IQueryable<Stock> GetAllStockItems();
    }
}