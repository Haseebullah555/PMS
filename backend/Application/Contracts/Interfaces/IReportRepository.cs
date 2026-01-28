using Application.Dtos.ReportDtos.FuelSummary;

namespace Application.Contracts.Interfaces
{
    public interface IReportRepository
    {
        Task<List<FuelSummaryDto>> GetFuelSummary(DateOnly fromDate, DateOnly toDate);
    }
}