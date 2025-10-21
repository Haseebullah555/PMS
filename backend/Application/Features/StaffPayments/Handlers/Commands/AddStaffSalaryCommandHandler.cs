using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddStaffSalaryCommandHandler : IRequestHandler<AddStaffSalaryCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddStaffSalaryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddStaffSalaryCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<StaffPayment>(request.StaffSalaryDto);
            await _unitOfWork.StaffPayments.Add(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}