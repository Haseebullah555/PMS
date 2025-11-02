using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddCustomerCommand : IRequest
    {
        public CustomerDto CustomerDto { get; set; }
    }
}