using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Contracts.Interfaces.Common;
using Application.Features.CustomerLoanPayment.Requests.Commands;
using AutoMapper;
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
            var result = _mapper.Map<Domain.Models.CustomerLoanPayment>(request.CustomerLoanPaymentDto);
            await _unitOfWork.CustomerLoanPayments.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }

    }
}