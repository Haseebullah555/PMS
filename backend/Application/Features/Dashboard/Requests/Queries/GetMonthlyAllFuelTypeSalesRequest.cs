using Application.Dtos.Dashboard;
using MediatR;

namespace Application.Features.Dashboard.Requests.Queries
{
    public class GetMonthlyAllFuelTypeSalesRequest : IRequest<List<DashboardChartDto>>
    {
        
    }
}