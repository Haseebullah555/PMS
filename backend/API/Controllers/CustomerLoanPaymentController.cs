using API.Controllers.Common;
using Application.Dtos;
using Application.Features.CustomerLoanPayment.Requests.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerLoanPaymentController : BaseApiController
    {
        [HttpPost("createCustomerLoanPayment")]
        public async Task<IActionResult> CreateCustomerLoanPayment(CustomerLoanPaymentDto customerLoanPaymentDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddCustomerLoanPaymentCommand{CustomerLoanPaymentDto = customerLoanPaymentDto});
                return Ok(new { message = "پرداخت قرضه با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد پرداخت قرضه ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}