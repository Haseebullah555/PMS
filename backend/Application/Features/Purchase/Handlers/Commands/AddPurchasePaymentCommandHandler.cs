using Application.Contracts.Interfaces.Common;
using Application.Features.Purchase.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.Purchase.Handlers.Commands
{
    public class AddPurchasePaymentCommandHandler : IRequestHandler<AddPuchasePaymentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddPurchasePaymentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddPuchasePaymentCommand request, CancellationToken cancellationToken)
        {
           var supplierLoanPayment = _mapper.Map<SupplierLoanPayment>(request.SupplierLoanPaymentDto);

        // Save to DB
        await _unitOfWork.SupplierLoanPayments.AddAsync(supplierLoanPayment);
        await _unitOfWork.SaveAsync(cancellationToken);
           
        }

    }
}