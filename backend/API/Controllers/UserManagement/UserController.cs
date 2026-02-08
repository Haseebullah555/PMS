using API.Controllers.Common;
using Application.Features.UserManagement.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UserManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseApiController
    {
        [HttpGet("all_users")]
        public async Task<IActionResult> GetUserList(int page, int perPage, string? search, string? sortBy, string? sortDirection)
        {
            var users = await _mediator.Send(new GetListOfAllUsersWithParamRequest
            {
               Page = page,
               PerPage = perPage,
               Search = search,
               SortBy = sortBy,
               SortDirection = sortDirection 
            });
            return Ok(users);
        }
    }
}