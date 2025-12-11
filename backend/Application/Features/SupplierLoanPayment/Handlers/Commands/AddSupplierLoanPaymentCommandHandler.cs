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
            var supplierLoanPayment = _mapper.Map<Domain.Models.SupplierLoanPayment>(request.SupplierLoanPaymentDto);
            // Save to DB
            await _unitOfWork.SupplierLoanPayments.AddAsync(supplierLoanPayment);
            await _unitOfWork.SaveAsync(cancellationToken);

        }

    }
}