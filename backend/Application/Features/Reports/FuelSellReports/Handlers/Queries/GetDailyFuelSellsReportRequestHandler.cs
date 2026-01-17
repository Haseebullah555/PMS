using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Application.Dtos.ReportDtos.DailyFuelSellReportDtos;
using Application.Features.Reports.FuelSellReports.Requests.Queries;
using MediatR;

namespace Application.Features.Reports.FuelSellReports.Handlers.Queries
{
    public class GetDailyFuelSellsReportRequestHandler : IRequestHandler<GetDailyFuelSellsReportRequest, List<DailyFuelSellReportDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheRepository _cache;

        public GetDailyFuelSellsReportRequestHandler(IUnitOfWork unitOfWork, ICacheRepository cache)
        {
            _unitOfWork = unitOfWork;
            _cache = cache;
        }
        public async Task<List<DailyFuelSellReportDto>> Handle(GetDailyFuelSellsReportRequest request, CancellationToken cancellationToken)
        {
            var group = "dashboard:daily-fuel-sales";
            var key = $"{group}:{request.FromDate}:{request.ToDate}";

            var cached = await _cache.GetAsync<List<DailyFuelSellReportDto>>(key);
            if (cached != null)
                return cached;

            var data = await _unitOfWork.DailyFuelSells
                .GetDailyFuelSalesAsync(
                    request.FromDate,
                    request.ToDate,
                    cancellationToken);

            await _cache.SetAsync(key, data, TimeSpan.FromMinutes(5));
            await _cache.RegisterKeyAsync(group, key);

            return data;

        }
    }
}