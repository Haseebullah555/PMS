using Application.Dtos.CustomerLoanDtos;
using MediatR;

namespace Application.Features.CustomerLoan.Requests.Commands
{
    public class UpdateCustomerLoanCommand : IRequest
    {
        public UpdateCustomerLoanDto UpdateCustomerLoanDto { get; set; }
    }
}