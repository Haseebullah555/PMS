using API.Controllers.Common;
using Application.Dtos.CustomerLoanDtos;
using Application.Features.CustomerLoan.Requests.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerLoanController : BaseApiController
    {

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] AddCustomerLaonDto addCustomerLoanDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddCustomerLoanCommand { AddCustomerLaonDto = addCustomerLoanDto });
                return Ok(new { message = "قرض مشتری با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد قرض مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update([FromBody] UpdateCustomerLoanDto updateCustomerLoanDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateCustomerLoanCommand { UpdateCustomerLoanDto = updateCustomerLoanDto });
                return Ok(new { message = "قرض مشتری با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید قرض مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}