using API.Controllers.Common;
using Application.Dtos;
using Application.Features.Good.Requests.Commands;
using Application.Features.Good.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoodController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllGoods([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfGoodsRequest
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
        [HttpPost("Create")]
        public async Task<ActionResult> Create(GoodDto GoodDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new CreateGoodCommand { GoodDto = GoodDto });
                return Ok(new { message = " جنس با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد جنس ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("Update")]
        public async Task<ActionResult> Update(GoodDto GoodDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateGoodCommand { GoodDto = GoodDto });
                return Ok(new { message = "جنس با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید جنس ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}