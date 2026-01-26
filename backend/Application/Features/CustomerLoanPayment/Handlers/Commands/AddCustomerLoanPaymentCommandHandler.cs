using Application.Contracts.Interfaces.Common;
using Application.Features.CustomerLoanPayment.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.CustomerLoanPayment.Handlers.Commands
{
    public class AddCustomerLoanPaymentCommandHandler : IRequestHandler<AddCustomerLoanPaymentCommand>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddCustomerLoanPaymentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddCustomerLoanPaymentCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                // 1️⃣ Save loan payment
                var payment = _mapper.Map<Domain.Models.CustomerLoanPayment>(request.CustomerLoanPaymentDto);
                await _unitOfWork.CustomerLoanPayments.AddAsync(payment);

                // 2️⃣ Update customer balance
                var customer = await _unitOfWork.Customers
                    .GetByIdAsync(request.CustomerLoanPaymentDto.CustomerId);

                customer.Balance -= request.CustomerLoanPaymentDto.PaidLoanAmount;

                if (customer.Balance < 0)
                    throw new InvalidOperationException("Customer balance cannot be negative");

                _unitOfWork.Customers.Update(customer);

                // 3️⃣ Financial transaction
                var txn = new FinancialTransaction
                {
                    Date = request.CustomerLoanPaymentDto.PaymentDate,
                    Type = "CustomerLoanPayment",
                    ReferenceId = payment.Id,
                    PartyType = "Customer",
                    PartyId = customer.Id,
                    Amount = request.CustomerLoanPaymentDto.PaidLoanAmount,
                    Direction = "IN",
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.FinancialTransactions.AddAsync(txn);

                // 4️⃣ Save everything
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