using Application.Contracts.UserManagement;
using Application.Dtos.Common;
using Application.Dtos.UserManagement.Roles;
using Domain.Models.UserManagement;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories.UserManagement
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        private readonly AppDbContext _context;

        public RoleRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<PermissionDto>> GetAllPermissions()
        {
            var query = _context.Permissions
            .AsNoTracking()
            .AsQueryable();
            var permissions = await query
                .Select(x => new PermissionDto
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .ToListAsync();
            return permissions;
        }

        public async Task<PaginatedResult<RolesListDto>> GetAllRolesList(
            int page,
            int perPage,
            string? search,
            string? sortBy,
            string? sortDirection)
        {
            page = page <= 0 ? 1 : page;
            perPage = perPage <= 0 ? 10 : perPage;

            var query = _context.Roles
                .AsNoTracking()
                .Include(x => x.RolePermissions)
                    .ThenInclude(ur => ur.Permission)
                .AsQueryable();

            // ===================== SORTING =====================
            query = sortBy?.ToLower() switch
            {
                "username" => sortDirection == "desc"
                    ? query.OrderByDescending(x => x.Name)
                    : query.OrderBy(x => x.Name),

                _ => query.OrderBy(x => x.Name)
            };

            // ===================== TOTAL =====================
            var total = await query.CountAsync();

            // ===================== PAGINATION =====================
            var users = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .Select(x => new RolesListDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    RolePermissions = x.RolePermissions
                    .Select(ur => ur.Permission.Id.ToString())
                    .ToList()
                })
                .ToListAsync();

            return new PaginatedResult<RolesListDto>
            {
                Data = users,
                Total = total,
                CurrentPage = page,
                PerPage = perPage
            };
        }
    }
}