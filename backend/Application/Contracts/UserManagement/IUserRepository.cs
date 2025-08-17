using Domain.UserManagement;

namespace Application.Contracts.UserManagement
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
    }
}