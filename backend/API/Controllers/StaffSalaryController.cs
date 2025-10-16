using API.Controllers.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Commands;
using Application.Features.sample.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffSalarySalaryController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllStaffSalarys([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfStaffSalarysRequest
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
        public async Task<ActionResult> Create([FromBody] StaffSalaryDto staffDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddStaffSalaryCommand { StaffSalaryDto = staffDto });
                return Ok(new { message = "معاش کارمند با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد معاش کارمند ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(StaffSalaryDto staffDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateStaffSalaryCommand { StaffSalaryDto = staffDto });
                return Ok(new { message = "معاش کارمند با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید معاش کارمند ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}