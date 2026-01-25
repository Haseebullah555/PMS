using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Application.Dtos.Dashboard;
using Application.Features.Dashboard.Requests.Queries;
using MediatR;

namespace Application.Features.Dashboard.Handlers.Queries
{
    public class GetDailyAllFuelTypeSalesRequestHandler : IRequestHandler<GetDailyAllFuelTypeSalesRequest, List<DashboardDailySalesDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheRepository _cache;

        public GetDailyAllFuelTypeSalesRequestHandler(IUnitOfWork unitOfWork, ICacheRepository cache)
        {
            _unitOfWork = unitOfWork;
            _cache = cache;
        }
        public async Task<List<DashboardDailySalesDto>> Handle(GetDailyAllFuelTypeSalesRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Dashboards.GetDailyFuelTypeSales();
            return result;
        }
    }
}