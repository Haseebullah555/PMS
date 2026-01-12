using Application.Dtos.CustomerDtos;
using MediatR;

namespace Application.Features.Customer.Requests.Queries
{
    public class GetListOfCustomersRequest : IRequest<List<CustomerDto>>
    {

    }
}