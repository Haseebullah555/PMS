using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IPurchaseRepository : IGenericRepository<Purchase>
    {
        IQueryable<Purchase> GetListOfPurchases();
        
    }
}