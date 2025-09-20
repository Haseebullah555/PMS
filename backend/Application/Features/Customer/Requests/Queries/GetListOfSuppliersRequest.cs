using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetListOfCustomersRequest : IRequest<List<CustomerDto>>
    {
        
    }
}