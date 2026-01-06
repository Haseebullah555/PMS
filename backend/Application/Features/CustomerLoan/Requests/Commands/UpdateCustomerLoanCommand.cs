using Application.Dtos;
using MediatR;

namespace Application.Features.CustomerLoan.Requests.Commands
{
    public class UpdateCustomerLoanCommand : IRequest
    {
        public CustomerLoanDto CustomerLoanDto { get; set; }
    }
}