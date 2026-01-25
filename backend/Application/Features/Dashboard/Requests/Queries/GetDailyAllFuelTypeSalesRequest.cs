using Application.Dtos.Dashboard;
using MediatR;

namespace Application.Features.Dashboard.Requests.Queries
{
    public class GetDailyAllFuelTypeSalesRequest : IRequest<List<DashboardDailySalesDto>>
    {
        
    }
}