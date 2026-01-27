using Application.Contracts.Interfaces.Common;
using Application.Dtos.Dashboard;
using Application.Features.Dashboard.Requests.Queries;
using MediatR;

namespace Application.Features.Dashboard.Handlers.Queries
{
    public class GetAviliableStockRequestHandler : IRequestHandler<GetAviliableStockRequest, List<DashboardAviliableStockDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAviliableStockRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<DashboardAviliableStockDto>> Handle(GetAviliableStockRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Dashboards.GetAviliableStocks();
            return result;
        }
    }
}