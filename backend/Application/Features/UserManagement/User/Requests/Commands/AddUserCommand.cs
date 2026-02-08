using Application.Dtos.UserManagement;
using MediatR;

namespace Application.Features.UserManagement.User.Requests.Commands
{
    public class AddUserCommand : IRequest
    {
        public UserDto MyProperty { get; set; }
    }
}