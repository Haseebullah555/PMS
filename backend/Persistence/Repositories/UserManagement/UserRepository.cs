using Application.Contracts.UserManagement;
using Application.Dtos.Common;
using Application.Dtos.UserManagement;
using Domain.UserManagement;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;

namespace Persistence.Repositories.UserManagement
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedResult<UserListDto>> GetAllUsers(
       int page,
       int perPage,
       string? search,
       string? sortBy,
       string? sortDirection)
        {
            page = page <= 0 ? 1 : page;
            perPage = perPage <= 0 ? 10 : perPage;

            var query = _context.Users
                .AsNoTracking()
                .Include(x => x.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .AsQueryable();

            // ===================== SORTING =====================
            query = sortBy?.ToLower() switch
            {
                "username" => sortDirection == "desc"
                    ? query.OrderByDescending(x => x.UserName)
                    : query.OrderBy(x => x.UserName),

                "email" => sortDirection == "desc"
                    ? query.OrderByDescending(x => x.Email)
                    : query.OrderBy(x => x.Email),

                "role" => sortDirection == "desc"
                    ? query.OrderByDescending(x => x.UserRoles)
                    : query.OrderBy(x => x.UserRoles),

                _ => query.OrderBy(x => x.UserName)
            };

            // ===================== TOTAL =====================
            var total = await query.CountAsync();

            // ===================== PAGINATION =====================
            var users = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .Select(x => new UserListDto
                {
                    Id = x.Id,
                    UserName = x.UserName,
                    Email = x.Email,
                    Roles = x.UserRoles
                    .Select(ur => ur.Role.Name)
                    .ToList()
                })
                .ToListAsync();

            return new PaginatedResult<UserListDto>
            {
                Data = users,
                Total = total,
                CurrentPage = page,
                PerPage = perPage
            };
        }

        public async Task<UserListDto> GetUserByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return null;

            var user = await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Where(u => u.UserName == username)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Email = u.Email,
                    Roles = u.UserRoles.Select(ur => ur.Role.Name).ToList()
                })
                .FirstOrDefaultAsync();
                return user;


        }
    }
}