using Application.Dtos.UserManagement;
using Domain.UserManagement;

namespace Application.Contracts.UserManagement
{
    public interface IAuthRepository
    {
        Task<User> RegisterAsync(UserDto userDto);
        Task<TokenDto> LoginAsync(UserDto userDto);
    }
}