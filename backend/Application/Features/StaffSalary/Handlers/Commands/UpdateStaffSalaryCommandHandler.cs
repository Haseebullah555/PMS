using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class UpdateStaffCommandHandler : IRequestHandler<UpdateStaffSalaryCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateStaffCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateStaffSalaryCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Staff>(request.StaffSalaryDto);
            await _unitOfWork.Staffs.Update(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}