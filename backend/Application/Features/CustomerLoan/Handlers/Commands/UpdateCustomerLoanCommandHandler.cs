using Application.Contracts.Interfaces.Common;
using Application.Features.CustomerLoan.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.CustomerLoan.Handlers.Commands
{
    public class UpdateCustomerLoanCommandHandler : IRequestHandler<UpdateCustomerLoanCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateCustomerLoanCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(UpdateCustomerLoanCommand request, CancellationToken cancellationToken)
        {
            
            await using var tx = await _unitOfWork.BeginTransactionAsync();
            try
            {
                // ====================================================
                // 1- get the old TotalPrice from CustomerLoan
                // ====================================================
                var customerLoan = await _unitOfWork.CustomerLoans.GetCustomerLoanByIdAsync(request.UpdateCustomerLoanDto.Id);
                if (customerLoan is null)
                {
                    throw new InvalidOperationException("Customer Loan not found.");
                }
                decimal oldTotalPrice = customerLoan.TotalPrice;

                // ================================================================
                // 2- Update Customer Balance ( Remove the old TotalPrice from customer balance and add the new TotalPrice)
                // ================================================================
                var customer = await _unitOfWork.Customers.GetByIdAsync(request.UpdateCustomerLoanDto.CustomerId);
                if (customer is null)
                {
                    throw new InvalidOperationException("Customer not found.");
                }

                decimal calculateBalance = customer.Balance - oldTotalPrice;
                customer.Balance = calculateBalance;
                _unitOfWork.Customers.Update(customer);
                await _unitOfWork.SaveAsync(cancellationToken);

                // ====================================================
                // 3- Update CustomerLoan Record
                // ====================================================
                _unitOfWork.CustomerLoans.Update(customerLoan);
                await _unitOfWork.SaveAsync(cancellationToken);

                await tx.CommitAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync(cancellationToken);
                throw;
            }
        }

    }
}