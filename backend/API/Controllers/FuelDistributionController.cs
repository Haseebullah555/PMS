using Microsoft.AspNetCore.Mvc;
using API.Controllers.Common;
using Application.Features.FuelDistribution.Requests.Queries;
using Application.Dtos.FuelDistribution;
using Application.Features.FuelDistribution.Requests.Commands;
using Application.Dtos.FuelDistributionDtos;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelDistributionController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllFuelDisbutions([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfFuelDistributionRequest
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
        [HttpGet("StandFuelWithDetials")]
        public async Task<ActionResult> StandFuelWithDetails()
        {
            var result = await _mediator.Send(new GetFuelStandWithDetialsRequest());
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] AddFuelDistributionDto addFuelDistributionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });
            try
            {
                await _mediator.Send(new AddFuelDistributionCommand { AddFuelDistributionDto = addFuelDistributionDto });
                return Ok(new { message = "توزیع تیل به پایه موفقیت ثبت شد" });
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
        [HttpPost("update")]
        public async Task<IActionResult> Update(UpdateFuelDistributionDto updateFuelDistributionDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateFuelDistributionCommand{UpdateFuelDistributionDto = updateFuelDistributionDto});
                return Ok(new { message = "توزیع تیل به پایه تجدید شد" });
            }
            return BadRequest(new { message = "توزیع تیل به پایه تجدید نشد", errors = ModelState });
        }


    }
}

