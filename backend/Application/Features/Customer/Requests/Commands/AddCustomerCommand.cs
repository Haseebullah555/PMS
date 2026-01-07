using Application.Dtos.CustomerDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddCustomerCommand : IRequest
    {
        public AddCustomerDto AddCustomerDto { get; set; }
    }
}