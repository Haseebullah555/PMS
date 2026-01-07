using Application.Dtos.SupplierDtos;
using MediatR;

namespace Application.Features.Supplier.Requests.Queries
{
    public class GetAllSuppliers : IRequest<List<SupplierDto>>
    {
    }
}