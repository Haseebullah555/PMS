using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers.Common;
using Application.Dtos;
using Application.Features.DailyFuelSell.Requests.Commands;
using Application.Features.FuelStand.Commands.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DailyFuelSellController : BaseApiController
    {
       
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