
using Application.Dtos.Dashboard;

namespace Application.Contracts.Interfaces
{
    public interface IDashboardRepository
    {
        Task<List<DashboardChartDto>> GetAnnualFuelTypeSales();
    }
}