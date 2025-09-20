using API.Controllers.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Commands;
using Application.Features.sample.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllSuppliers()
        {
            var suppliers = await _mediator.Send(new GetListOfSuppliersRequest());
            return Ok(suppliers);
        }
        [HttpPost("Create")]
        public async Task<ActionResult> Create(SupplierDto supplierDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new AddSupplierCommand { SupplierDto = supplierDto });
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPut("Update")]
        public async Task<ActionResult> Update(SupplierDto supplierDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdateSupplierCommand { SupplierDto = supplierDto });
                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}