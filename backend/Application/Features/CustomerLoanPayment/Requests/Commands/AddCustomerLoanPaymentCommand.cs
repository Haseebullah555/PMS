using Application.Dtos;
using MediatR;

namespace Application.Features.CustomerLoanPayment.Requests.Commands
{
    public class AddCustomerLoanPaymentCommand: IRequest
    {
        public CustomerLoanPaymentDto CustomerLoanPaymentDto { get; set; }
    }
}