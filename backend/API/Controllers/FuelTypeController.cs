using API.Controllers.Common;
using Application.Features.FuelType.Requests.Queries;
using Microsoft.AspNetCore.Mvc;
using Application.Features.FuelType.Commands.Queries;
using Application.Features.FuelType.Requests.Commands;
using Application.Dtos.FuelTypeDtos;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelTypeController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllFuelTypes([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfFuelTypesRequest
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
        public async Task<ActionResult> GetFuelTypesList()
        {
            var result = await _mediator.Send(new GetListOfFuelTypesRequest());
            return Ok(result);
        }
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] AddFuelTypeDto addFuelTypeDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new CreateFuelTypeCommand { AddFuelTypeDto = addFuelTypeDto });
                return Ok(new { message = "نوع نفت با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(UpdateFuelTypeDto updateFuelTypeDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateFuelTypeCommand { UpdateFuelTypeDto = updateFuelTypeDto });
                return Ok(new { message = "نوع نفت با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید نوع نفت ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}