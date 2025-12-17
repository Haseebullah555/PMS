using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MediatR;
using API.Controllers.Common;
using Application.Features.FuelDistribution.Requests.Queries;
using Application.Dtos.FuelDistribution;
using Application.Features.DailyFuelSell.Requests.Commands;
using Application.Features.FuelDistribution.Requests.Commands;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuelDistributionController : BaseApiController
    {
        [HttpGet("StandFuelWithDetials")]
        public async Task<ActionResult> StandFuelWithDetails([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetFuelStandWithDetialsRequest
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
                    last_page = (int)Math.Ceiling((double)result.Total / result.PerPage),
                    from = ((result.CurrentPage - 1) * result.PerPage) + 1,
                    to = Math.Min(result.CurrentPage * result.PerPage, result.Total)
                }
            });
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
    }
}

