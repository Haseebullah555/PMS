using Application.Contracts.Interfaces.Common;
using Application.Dtos.ReportDtos.DailyFuelSellReportDtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IDailyFuelSellRepository : IGenericRepository<DailyFuelSell>
    {
        IQueryable<DailyFuelSell> ListOfDailyFuelSell();
        Task<List<DailyFuelSellReportDto>> GetDailyFuelSalesAsync(DateOnly? fromDate,DateOnly? toDate,CancellationToken cancellationToken);

    }
}