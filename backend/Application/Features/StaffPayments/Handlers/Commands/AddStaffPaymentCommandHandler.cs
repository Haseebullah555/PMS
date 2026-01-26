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
            try
            {
                var staff = await _unitOfWork.Staffs.GetByIdAsync(request.StaffPaymentDto.StaffId);

                staff.Balance -= request.StaffPaymentDto.PaidAmount;
                staff.UpdatedAt = DateTime.UtcNow;

                if (staff.Balance < 0)
                    throw new InvalidOperationException("Staff balance cannot be negative.");

                var payment = _mapper.Map<StaffPayment>(request.StaffPaymentDto);
                payment.CreatedAt = DateTime.UtcNow;

                await _unitOfWork.StaffPayments.AddAsync(payment);
                _unitOfWork.Staffs.Update(staff);

                // 🔹 Save first to generate payment.Id
                await _unitOfWork.SaveAsync(cancellationToken);

                // Financial transaction
                var txn = new FinancialTransaction
                {
                    Date = request.StaffPaymentDto.PaymentDate,
                    Type = "StaffPayment",
                    ReferenceId = payment.Id,
                    PartyType = "Staff",
                    PartyId = staff.Id,
                    Amount = request.StaffPaymentDto.PaidAmount,
                    Direction = "OUT",
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.FinancialTransactions.AddAsync(txn);

                await _unitOfWork.SaveAsync(cancellationToken);
                await tx.CommitAsync(cancellationToken);
            }
            catch
            {
                await tx.RollbackAsync(cancellationToken);
                throw;
            }
        }

    }
}