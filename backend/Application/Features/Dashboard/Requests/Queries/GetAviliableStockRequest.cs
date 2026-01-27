using Application.Dtos.Dashboard;
using MediatR;

namespace Application.Features.Dashboard.Requests.Queries
{
    public class GetAviliableStockRequest : IRequest<List<DashboardAviliableStockDto>>
    {
        
    }
}