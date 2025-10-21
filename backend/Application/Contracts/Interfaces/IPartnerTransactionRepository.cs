using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IPartnerTransactionRepository : IGenericRepository<PartnerTransaction>
    {
        Task<List<PartnerTransactionDto>> GetListOfPartnerTransactions();        
    }
}