using Application.Contracts.Interfaces.Common;
using Application.Dtos.ReportDtos.FuelSummary;
using Application.Features.Reports.FuelSummary.Requests.Queries;
using MediatR;

namespace Application.Features.Reports.FuelSummary.Handlers.Queries
{
    public class GetFuelSummaryRequestHandler : IRequestHandler<GetFuelSummaryRequest, DailyFuelDynamicDto>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetFuelSummaryRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<DailyFuelDynamicDto> Handle(GetFuelSummaryRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Reports.GetFuelSummary(request.FromDate, request.ToDate);
            return result;
        }
    }
}