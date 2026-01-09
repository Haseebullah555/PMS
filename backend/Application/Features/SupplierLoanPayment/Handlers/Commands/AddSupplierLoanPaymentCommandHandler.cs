using Application.Contracts.Interfaces.Common;
using Application.Features.SupplierLoanPayment.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.SupplierLoanPayment.Handlers.Commands
{
    public class AddSupplierLoanPaymentCommandHandler : IRequestHandler<AddSupplierLoanPaymentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddSupplierLoanPaymentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddSupplierLoanPaymentCommand request, CancellationToken cancellationToken)
        {

            await using var tx = await _unitOfWork.BeginTransactionAsync();

            // 2️⃣ Update the balace column in supplier and set the uppaidAmount
            // 3️⃣ Update the supplier balance
            var supplier = await _unitOfWork.SupplierLoanPayments.GetSupplierByIdAsync(request.AddSupplierLoanPaymentDto.SupplierId);

            if (supplier is null)
            {
                throw new InvalidOperationException("Supplier not found.");
            }
            // Update balance (subtract paid amount)
            supplier.Balance -= request.AddSupplierLoanPaymentDto.PaidLoanAmount;

            _unitOfWork.Suppliers.Update(supplier);
            await _unitOfWork.SaveAsync(cancellationToken);


            var supplierLoanPayment = _mapper.Map<Domain.Models.SupplierLoanPayment>(request.AddSupplierLoanPaymentDto);
            // Save to DB
            await _unitOfWork.SupplierLoanPayments.AddAsync(supplierLoanPayment);
            await _unitOfWork.SaveAsync(cancellationToken);

            await tx.CommitAsync(cancellationToken);

        }

    }
}