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
                var customer = await _unitOfWork.Customers.GetByIdAsync(request.AddCustomerLaonDto.CustomerId);
                // var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(request.AddCustomerLaonDto.FuelTypeId);
                // var gun = await _unitOfWork.FuelGuns.GetByIdAsync(request.AddCustomerLaonDto.FuelGunId);

                if (customer is null)
                    throw new InvalidOperationException("Customer not found.");

                // update customer
                customer.Balance += request.AddCustomerLaonDto.TotalPrice;
                _unitOfWork.Customers.Update(customer);

                // update stock
                // stock.QuantityInLiter -= request.AddCustomerLaonDto.FuelAmount;
                // _unitOfWork.Stocks.Update(stock);

                // update gun
                // gun.Balance -= request.AddCustomerLaonDto.FuelAmount;
                // _unitOfWork.FuelGuns.Update(gun);

                // create loan record
                var result = _mapper.Map<Domain.Models.CustomerLoan>(request.AddCustomerLaonDto);
                await _unitOfWork.CustomerLoans.AddAsync(result);

                // 👇 Save ONCE
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