using Application.Contracts.Interfaces.Common;
using Application.Features.Dashboard.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Dashboard.Handlers.Queries
{
    public class GetDailyProfitRequestHandler : IRequestHandler<GetDailyProfitRequest, decimal>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetDailyProfitRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<decimal> Handle(GetDailyProfitRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Dashboards.GetDailyProfit();
            return result;
        }
    }
}