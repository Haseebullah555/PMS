using Application.Features.CustomerLoan.Requests.Commands;
using Application.Contracts.Interfaces.Common;
using AutoMapper;
using MediatR;
using Domain.Models;

namespace Application.Features.CustomerLoan.Handlers.Commands
{
    public class AddCustomerLoanCommandHandler : IRequestHandler<AddCustomerLoanCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddCustomerLoanCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(AddCustomerLoanCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                var dto = request.AddCustomerLaonDto;

                var customer = await _unitOfWork.Customers.GetByIdAsync(dto.CustomerId);
                if (customer is null)
                    throw new InvalidOperationException("Customer not found.");

                // ===============================
                // 1️⃣ Update customer balance
                // ===============================
                customer.Balance += dto.TotalPrice;
                customer.UpdatedAt = DateTime.UtcNow;
                _unitOfWork.Customers.Update(customer);

                // ===============================
                // 2️⃣ Create loan record
                // ===============================
                var loan = _mapper.Map<Domain.Models.CustomerLoan>(dto);
                loan.CreatedAt = DateTime.UtcNow;

                await _unitOfWork.CustomerLoans.AddAsync(loan);

                // ===============================
                // 3️⃣ Record financial transaction
                // ===============================
                var txn = new FinancialTransaction
                {
                    Date = dto.LoanDate,
                    Type = "CustomerLoan",
                    ReferenceId = loan.Id,
                    PartyType = "Customer",
                    PartyId = dto.CustomerId,
                    Amount = dto.TotalPrice,
                    Direction = "IN", // Revenue earned, cash not yet received
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.FinancialTransactions.AddAsync(txn);

                // ===============================
                // 4️⃣ Save & Commit
                // ===============================
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