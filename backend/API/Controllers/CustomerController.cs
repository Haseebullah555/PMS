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
        public async Task<ActionResult> GetAllCustomers()
        {
            var Customers = await _mediator.Send(new GetListOfCustomersRequest());
            return Ok(Customers);
        }
        [HttpPost("Create")]
        public async Task<ActionResult> Create(CustomerDto CustomerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddCustomerCommand { CustomerDto = CustomerDto });
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPut("Update")]
        public async Task<ActionResult> Update(CustomerDto CustomerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateCustomerCommand { CustomerDto = CustomerDto });
                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}