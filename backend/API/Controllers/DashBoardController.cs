using API.Controllers.Common;
using Application.Features.Dashboard.Requests.Queries;
using Application.Features.Reports.FuelSellReports.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashBoardController : BaseApiController
    {
        [HttpGet("daily-fuel-sales")]
        public async Task<IActionResult> GetDailyFuelSales()
        {
            var result = await _mediator.Send(new GetDailyAllFuelTypeSalesRequest());
            return Ok(result);
        }
        
        [HttpGet("annual-fuel-sales")]
        public async Task<IActionResult> GetAnnualFuelSales()
        {
            var result = await _mediator.Send(new GetMonthlyAllFuelTypeSalesRequest());
            return Ok(result);
        }
        [HttpGet("available-stocks")]
        public async Task<IActionResult> GetAvailableStocks()
        {
            var result = await _mediator.Send(new GetAviliableStockRequest());
            return Ok(result);
        }
    }
}