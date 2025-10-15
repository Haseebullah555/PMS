using API.Controllers.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Commands;
using Application.Features.sample.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExtraExpenseController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllExtraExpenses([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfExtraExpensesRequest
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
        public async Task<ActionResult> Create([FromBody] ExtraExpensesDto extraExpenseDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddExtraExpenseCommand { ExtraExpensesDto = extraExpenseDto });
                return Ok(new { message = "مصارف متفرقه با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد مصارف متفرقه ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(ExtraExpensesDto extraExpenseDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateExtraExpenseCommand { ExtraExpensesDto = extraExpenseDto });
                return Ok(new { message = "مصارف متفرقه با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید مصارف متفرقه ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}