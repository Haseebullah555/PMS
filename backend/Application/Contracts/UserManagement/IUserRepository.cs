using System.Globalization;
using Application.Dtos.Common;
using Application.Dtos.UserManagement;
using Domain.UserManagement;

namespace Application.Contracts.UserManagement
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task<PaginatedResult<UserListDto>> GetAllUsers(
           int page,
            int perPage,
            string search,
            string? sortBy,
            string? sortDirection
        );
    }
}