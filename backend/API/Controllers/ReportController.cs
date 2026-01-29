using Application.Features.Reports.FuelSummary.Requests.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        private readonly IMediator _mediator;

        public ReportController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("fuel-summary")]
        public async Task<IActionResult> GetFuelSummary(DateOnly fromDate, DateOnly toDate)
        {
            var result = await _mediator.Send(new GetFuelSummaryRequest{ FromDate = fromDate, ToDate = toDate });
            return Ok(result);
        }

       
    }
}