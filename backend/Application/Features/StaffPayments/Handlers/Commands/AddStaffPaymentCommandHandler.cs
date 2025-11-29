using Application.Contracts.Interfaces.Common;
using Application.Features.StaffPayments.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.StaffPayments.Handlers.Commands
{
    public class AddStaffPaymentCommandHandler : IRequestHandler<AddStaffPaymentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddStaffPaymentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddStaffPaymentCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<StaffPayment>(request.StaffPaymentDto);
            await _unitOfWork.StaffPayments.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}