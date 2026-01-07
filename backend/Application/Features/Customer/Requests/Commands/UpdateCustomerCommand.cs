using Application.Dtos.CustomerDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateCustomerCommand : IRequest
    {
        public UpdateCustomerDto UpdateCustomerDto { get; set; }
    }
}