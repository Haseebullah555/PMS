using API.Controllers.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Commands;
using Application.Features.sample.Requests.Queries;
using Application.Features.Staff.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllStaffs([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfStaffsRequest
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
        [HttpGet("listAll")]
        public async Task<ActionResult> GetStaffsList()
        {
            var result = await _mediator.Send(new GetStaffsListRequest());
            return Ok(result);
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] StaffDto staffDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddStaffCommand { StaffDto = staffDto });
                return Ok(new { message = "کارمند با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد کارمند ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(StaffDto staffDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateStaffCommand { StaffDto = staffDto });
                return Ok(new { message = "کارمند با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید کارمند ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}