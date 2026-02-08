using Application.Dtos.Common;
using Application.Dtos.UserManagement.Roles;

namespace Application.Contracts.UserManagement
{
    public interface IRoleRepository
    {
        Task<PaginatedResult<RolesListDto>> GetAllRolesList(
            int page,
            int perPage,
            string search,
            string? sortBy,
            string? sortDirection
        );
    }
}