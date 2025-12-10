using API.Controllers.Common;
using Application.Dtos;
using Application.Features.Purchase.Requests.Commands;
using Application.Features.Purchase.Requests.Queries;
using Application.Features.sample.Requests.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchasesController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllPurchases([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfPurchasesRequest
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
        public async Task<ActionResult> Create([FromBody] AddPurchaseCommand command)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                var id = await _mediator.Send(command);
                return Ok(new { message = "خرید با موفقیت ثبت شد", id });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در ثبت خرید", error = ex.Message });
            }
        }
        [HttpPost("purchase-payment")]
         public async Task<ActionResult> CreateSupplierLoanPayment(SupplierLoanPaymentDto supplierLoanPaymentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                await _mediator.Send(new AddPuchasePaymentCommand{SupplierLoanPaymentDto = supplierLoanPaymentDto});
                return Ok(new { message = "خرید با موفقیت ثبت شد"});
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در ثبت خرید", error = ex.Message });
            }
        }

        [HttpPost("update")]
        public async Task<ActionResult> Update([FromBody] UpdatePurchaseCommand command)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(command);
                return Ok(new { message = "تامیین کننده با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید تامیین کننده ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }

        // ✅ GET: api/Purchase/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetPurchaseByIdRequest { PurchaseId = id });
            if (result == null)
                return NotFound(new { message = "خرید یافت نشد" });

            return Ok(result);
        }
    }
}