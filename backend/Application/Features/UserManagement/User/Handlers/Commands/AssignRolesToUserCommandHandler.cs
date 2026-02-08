using Application.Contracts.Interfaces.Common;
using Application.Contracts.UserManagement;
using Application.Features.UserManagement.User.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.UserManagement.User.Handlers.Commands
{
    public class AssignRolesToUserCommandHandler : IRequestHandler<AssignRolesToUserCommand>
    {
         private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserRepository _currentUser;
        public AssignRolesToUserCommandHandler(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserRepository currentUser)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUser = currentUser;
        }
        public Task Handle(AssignRolesToUserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}