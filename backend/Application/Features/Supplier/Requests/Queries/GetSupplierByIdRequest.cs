using Application.Dtos.SupplierDtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetSupplierByIdRequest : IRequest<SupplierDto>
    {
        public int Id { get; set; }
    }
}