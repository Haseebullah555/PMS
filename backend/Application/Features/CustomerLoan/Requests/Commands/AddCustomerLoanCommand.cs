using Application.Dtos;
using MediatR;

namespace Application.Features.CustomerLoan.Requests.Commands
{
    public class AddCustomerLoanCommand: IRequest
    {
        public CustomerLoanDto CustomerLoanDto { get; set; }
    }
}