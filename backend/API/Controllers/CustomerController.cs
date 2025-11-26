using API.Controllers.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Commands;
using Application.Features.sample.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllCustomers([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfCustomersRequest
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
        [HttpPost("Create")]
        public async Task<ActionResult> Create(CustomerDto CustomerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddCustomerCommand { CustomerDto = CustomerDto });
                return Ok(new { message = " مشتری با موفقیت اضافه گردید" });
            }
            return BadRequest(new { message = "اضافه نمودن مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("Update")]
        public async Task<ActionResult> Update(CustomerDto CustomerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateCustomerCommand { CustomerDto = CustomerDto });
                return Ok(new { message = "مشتری با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید مشتری ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}