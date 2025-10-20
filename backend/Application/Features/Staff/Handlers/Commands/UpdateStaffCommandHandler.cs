using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class UpdateStaffCommandHandler : IRequestHandler<UpdateStaffCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateStaffCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateStaffCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Staff>(request.StaffDto);
            await _unitOfWork.Staffs.Update(result);
        }
    }
}