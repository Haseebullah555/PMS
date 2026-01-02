using API.Controllers.Common;
using Application.Dtos;
using Application.Features.DailyFuelSell.Requests.Commands;
using Application.Features.DailyFuelSell.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DailyFuelSellController : BaseApiController
    {
       [HttpGet("list")]
        public async Task<ActionResult> GetAllDailyFuelSells([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfDailyFuelSellRequest
            {
                Search = search,
                SortField = sort_field,
                SortOrder = sort_order,
                Page = page,
                PerPage = per_page
            });

            return Ok(new
            {
                data = result.Data,
                meta = new
                {
                    total = result.Total,
                    current_page = result.CurrentPage,
                    per_page = result.PerPage,
                    last_page = result.LastPage,
                    from = result.From,
                    to = result.To
                }
            });
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] DailyFuelSellDto dailyFuelSellDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                 await _mediator.Send(new AddDailyFuelSellCommand { DailyFuelSellDto = dailyFuelSellDto });
                return Ok(new { message = "توزیع تیل روزانه موفقیت ثبت شد" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در ثبت معلومات", error = ex.Message });
            }
        }

    }
}