using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddStaffCommandHandler : IRequestHandler<AddStaffCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddStaffCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddStaffCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Staff>(request.StaffDto);
            await _unitOfWork.Staffs.Add(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}