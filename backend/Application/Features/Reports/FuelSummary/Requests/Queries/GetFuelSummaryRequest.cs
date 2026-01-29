using Application.Dtos.ReportDtos.FuelSummary;
using MediatR;

namespace Application.Features.Reports.FuelSummary.Requests.Queries
{
    public class GetFuelSummaryRequest : IRequest<DailyFuelDynamicDto>
    {
        public DateOnly FromDate { get; set; }
        public DateOnly ToDate { get; set; }
    }
}