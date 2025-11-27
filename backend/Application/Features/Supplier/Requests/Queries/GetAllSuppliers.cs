using Application.Dtos;
using MediatR;

namespace Application.Features.Supplier.Requests.Queries
{
    public class GetAllSuppliers : IRequest<List<SupplierDto>>
    {
    }
}