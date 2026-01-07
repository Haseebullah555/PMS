using Application.Dtos;
using Application.Dtos.SupplierDtos;
using MediatR;

namespace Application.Features.Customer.Requests.Commands
{
    public class DeleteSupplierCommamd : IRequest
    {
        public SupplierDto SupplierDto { get; set; }
    }
}