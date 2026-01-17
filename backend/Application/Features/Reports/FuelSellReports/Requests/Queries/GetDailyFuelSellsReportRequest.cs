using Application.Dtos.ReportDtos.DailyFuelSellReportDtos;
using MediatR;

namespace Application.Features.Reports.FuelSellReports.Requests.Queries
{
    public class GetDailyFuelSellsReportRequest : IRequest<List<DailyFuelSellReportDto>>
    {
        public DateOnly? FromDate { get; set; }
        public DateOnly? ToDate { get; set; }
    }
}