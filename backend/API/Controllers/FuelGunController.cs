using API.Controllers.Common;
using Application.Features.FuelGun.Requests.Queries;
using Microsoft.AspNetCore.Mvc;
using Application.Features.FuelGun.Commands.Queries;
using Application.Features.FuelGun.Requests.Commands;
using Application.Dtos.FuelGunDtos;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelGunController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllFuelGuns([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfFuelGunsRequest
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
        public async Task<ActionResult> GetFuelGunsList()
        {
            var result = await _mediator.Send(new GetListOfFuelGunsRequest());
            return Ok(result);
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] FuelGunListDto fuelGunDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new CreateFuelGunCommand { FuelGunDto = fuelGunDto });
                return Ok(new { message = "نوع نفت با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(FuelGunListDto fuelGunDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateFuelGunCommand { FuelGunDto = fuelGunDto });
                return Ok(new { message = "نوع نفت با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}