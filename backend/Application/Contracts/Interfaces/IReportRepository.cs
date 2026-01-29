using Application.Dtos.ReportDtos.FuelSummary;

namespace Application.Contracts.Interfaces
{
    public interface IReportRepository
    {
        Task<DailyFuelDynamicDto> GetFuelSummary(DateOnly fromDate, DateOnly toDate);
    }
}