using Application.Dtos.ReportDtos.FuelSummary;

namespace Application.Contracts.Interfaces
{
    public interface IReportRepository
    {
        Task<List<DailyFuelDynamicDto>> GetFuelSummary(DateOnly fromDate, DateOnly toDate);
    }
}