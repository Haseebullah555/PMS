using API.Controllers.Common;
using Application.Features.Reports.FuelSellReports.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashBoardController : BaseApiController
    {
        [HttpGet("daily-fuel-sales")]
        public async Task<IActionResult> GetDailyFuelSales(
        DateOnly? fromDate,
        DateOnly? toDate)
        {
            var result = await _mediator.Send(new GetDailyFuelSellsReportRequest
            {
                FromDate = fromDate,
                ToDate = toDate
            });

            return Ok(result);
        }
        
    }
}