using API.Controllers.Common;
using Application.Dtos;
using Application.Features.FuelStand.Requests.Queries;
using Microsoft.AspNetCore.Mvc;
using Application.Features.FuelStand.Commands.Queries;
using Application.Features.FuelStand.Requests.Commands;
using Application.Dtos.FuelStandDtos;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelStandController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllFuelStands([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfFuelStandsRequest
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
        public async Task<ActionResult> GetFuelStandsList()
        {
            var result = await _mediator.Send(new GetListOfFuelStandsRequest());
            return Ok(result);
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] CreateFuelStandDto createFuelStandDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new CreateFuelStandCommand { CreateFuelStandDto = createFuelStandDto });
                return Ok(new { message = "نوع نفت با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(UpdateFuelStandDto updateFuelStandDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateFuelStandCommand { UpdateFuelStandDto = updateFuelStandDto });
                return Ok(new { message = "نوع نفت با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}