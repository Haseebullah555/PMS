using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class UpdateStaffSalaryCommandHandler : IRequestHandler<UpdateStaffSalaryCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateStaffSalaryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateStaffSalaryCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.StaffSalary>(request.StaffSalaryDto);
            await _unitOfWork.StaffSalaries.Update(result);
        }
    }
}