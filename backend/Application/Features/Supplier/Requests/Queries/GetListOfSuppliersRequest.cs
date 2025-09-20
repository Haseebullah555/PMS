using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetListOfSuppliersRequest : IRequest<List<SupplierDto>>
    {
        
    }
}