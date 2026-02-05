using API.Controllers.Common;
using Application.Features.Currency.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    public class CurrencyController : BaseApiController
    {
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCurrencies()
        {
            var currencies = await _mediator.Send(new GetAllCurrenciesRequest());
            return Ok(currencies);
        }
    }
}