using API.Controllers.Common;
using Application.Features.Purchase.Requests.Queries;
using Application.Features.SupplierLoanPayment.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierLoanPaymentController : BaseApiController
    {
        // get suppliers, purchases, purchaseDetials with supplierLoanPayments list
        [HttpGet("getSuppliersWithDetials")]
        public async Task<ActionResult> GetSuppliersWithDetials([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetSuppliersWithDetailsRequest
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

        // get suppliers with supplierLoanPayments list
        [HttpGet("getSuppliersWithSupplierLoanPayments")]

        public async Task<ActionResult> GetSuppliersWithSupplierLoanPayments([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetSuppliersWithSupplierLoanPaymentsRequest
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
    }
}
