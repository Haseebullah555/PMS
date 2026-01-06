using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers.Common;
using Application.Dtos;
using Application.Features.CustomerLoan.Requests.Commands;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerLoanController : BaseApiController
    {

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] CustomerLoanDto customerLoanDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddCustomerLoanCommand { CustomerLoanDto = customerLoanDto });
                return Ok(new { message = "قرض مشتری با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد قرض مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update([FromBody] CustomerLoanDto customerLoanDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateCustomerLoanCommand { CustomerLoanDto = customerLoanDto });
                return Ok(new { message = "قرض مشتری با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید قرض مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}