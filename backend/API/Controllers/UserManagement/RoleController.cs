using API.Controllers.Common;
using Application.Features.UserManagement.Role.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.UserManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseApiController
    {
        [HttpGet("role_list")]
        public async Task<IActionResult> GetAllRoles(int page, int perPage, string? search, string? sortBy, string? sortDirection)
        {
            var roles = await _mediator.Send(new GetListOfAllRolesWithParamRequest
            {
                Page = page,
                PerPage = perPage,
                Search = search,
                SortBy = sortBy,
                SortDirection = sortDirection
            });
            return Ok(roles);
        }
    }
}