using Application.Dtos.CustomerDtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetCustomerByIdRequest : IRequest<CustomerDto>
    {
        public int Id { get; set; }
    }
}