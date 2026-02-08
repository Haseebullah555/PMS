using Application.Dtos.Common;
using Application.Dtos.UserManagement.Roles;
using Domain.UserManagement;

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
        Task<List<PermissionDto>> GetAllPermissions();
    }
}