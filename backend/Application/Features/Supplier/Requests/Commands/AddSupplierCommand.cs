using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddSupplierCommand : IRequest
    {
        public SupplierDto SupplierDto { get; set; }
    }
}