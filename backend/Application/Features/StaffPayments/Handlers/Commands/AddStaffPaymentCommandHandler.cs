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
            await using var tx = await _unitOfWork.BeginTransactionAsync();
            var result = _mapper.Map<StaffPayment>(request.StaffPaymentDto);
            var staff = await _unitOfWork.Staffs.GetByIdAsync(request.StaffPaymentDto.StaffId);
            staff.Balance = staff.Balance - request.StaffPaymentDto.PaidAmount;
            staff.UpdatedAt = DateTime.UtcNow;

            result.CreatedAt = DateTime.UtcNow;
            await _unitOfWork.StaffPayments.AddAsync(result);
            _unitOfWork.Staffs.Update(staff);
            await _unitOfWork.SaveAsync(cancellationToken);
            await tx.CommitAsync(cancellationToken);
        }
    }
}