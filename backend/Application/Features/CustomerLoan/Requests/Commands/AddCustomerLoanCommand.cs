using Application.Dtos.CustomerLoanDtos;
using MediatR;

namespace Application.Features.CustomerLoan.Requests.Commands
{
    public class AddCustomerLoanCommand: IRequest
    {
        public AddCustomerLaonDto AddCustomerLaonDto { get; set; }
    }
}