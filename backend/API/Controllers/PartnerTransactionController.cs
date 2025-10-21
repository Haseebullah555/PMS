using API.Controllers.Common;
using Application.Dtos;
using Application.Features.PartnerTransaction.Requests.Commands;
using Application.Features.PartnerTransaction.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartnerTransactionController : BaseApiController
    {
        [HttpGet("list")]
        public async Task<ActionResult> GetAllPartnerTransactions([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfPartnerTransactionsRequest
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
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] PartnerTransactionDto partnerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new CreatePartnerTransactionCommand { PartnerTransactionDto = partnerDto });
                return Ok(new { message = "معامله شریک با موفقیت ایجاد شد" });
            }
            return BadRequest(new { message = "ایجاد معامله شریک ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
        [HttpPost("update")]
        public async Task<ActionResult> Update(PartnerTransactionDto partnerDto)
        {
            if (ModelState.IsValid)
            {
                await _mediator.Send(new UpdatePartnerTransactionCommand { PartnerTransactionDto = partnerDto });
                return Ok(new { message = "معامله شریک با موفقیت تجدید شد" });
            }
            return BadRequest(new { message = "تجدید معامله شریک ناموفق بود. لطفا ورودی خود را بررسی کنید.", errors = ModelState });
        }
    }
}