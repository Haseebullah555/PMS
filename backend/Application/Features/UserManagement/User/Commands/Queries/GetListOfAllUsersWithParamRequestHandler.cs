using Application.Contracts.UserManagement;
using Application.Dtos.Common;
using Application.Dtos.UserManagement;
using Application.Features.UserManagement.Requests.Queries;
using MediatR;

namespace Application.Features.UserManagement.Commands.Queries
{
    public class GetListOfAllUsersWithParamRequestHandler : IRequestHandler<GetListOfAllUsersWithParamRequest, PaginatedResult<UserListDto>>
    {
        private readonly IUserRepository _user;

        public GetListOfAllUsersWithParamRequestHandler(IUserRepository user)
        {
            _user = user;
        }
        public async Task<PaginatedResult<UserListDto>> Handle(GetListOfAllUsersWithParamRequest request, CancellationToken cancellationToken)
        {
            var users = await _user.GetAllUsers(request.Page, request.PerPage, request.Search, request.SortBy, request.SortDirection);
            return users;
        }
    }
}