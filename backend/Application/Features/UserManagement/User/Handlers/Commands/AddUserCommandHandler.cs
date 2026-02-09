using Application.Contracts.Interfaces.Common;
using Application.Contracts.UserManagement;
using Application.Features.UserManagement.User.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.UserManagement.User.Handlers.Commands
{
    public class AddUserCommandHandler : IRequestHandler<AddUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserRepository _currentUser;

        public AddUserCommandHandler(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserRepository currentUser)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUser = currentUser;
            
        }
        public async Task Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<Domain.Models.UserManagement.User>(request.User);
            user.CreatedAt = DateTime.UtcNow;
            // user.CreatedBy = _currentUser.GetCurrentLoggedInUserId();
            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}