using Application.Features.CustomerLoan.Requests.Commands;
using Application.Contracts.Interfaces.Common;
using AutoMapper;
using MediatR;

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
                // ===========================================
                // 1- Update the balace column in customer 
                // ===========================================
                var customer = await _unitOfWork.Customers.GetCustomerByIdAsync(request.AddCustomerLaonDto.CustomerId);
                if (customer is null)
                {
                    throw new InvalidOperationException("Customer not found.");
                }
                // Update balance (add loan amount)
                customer.Balance += request.AddCustomerLaonDto.TotalPrice;
                _unitOfWork.Customers.Update(customer);
                await _unitOfWork.SaveAsync(cancellationToken);

                // ====================================
                // 2- Save to CustomerLoan Record
                // ====================================
                var result = _mapper.Map<Domain.Models.CustomerLoan>(request.AddCustomerLaonDto);
                await _unitOfWork.CustomerLoans.AddAsync(result);
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