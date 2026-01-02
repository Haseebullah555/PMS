using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IDailyFuelSellRepository : IGenericRepository<DailyFuelSell>
    {
        IQueryable<DailyFuelSell> ListOfDailyFuelSell();

    }
}