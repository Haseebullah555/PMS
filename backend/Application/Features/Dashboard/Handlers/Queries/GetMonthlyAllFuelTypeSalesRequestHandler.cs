using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Application.Dtos.Dashboard;
using Application.Features.Dashboard.Requests.Queries;
using MediatR;

namespace Application.Features.Dashboard.Handlers.Queries
{
    public class GetMonthlyAllFuelTypeSalesRequestHandler : IRequestHandler<GetMonthlyAllFuelTypeSalesRequest, List<DashboardChartDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheRepository _cache;

        public GetMonthlyAllFuelTypeSalesRequestHandler(IUnitOfWork unitOfWork, ICacheRepository cache)
        {
            _unitOfWork = unitOfWork;
            _cache = cache;
        }
        public Task<List<DashboardChartDto>> Handle(GetMonthlyAllFuelTypeSalesRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}