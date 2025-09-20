using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateSupplierCommand : IRequest
    {
        public SupplierDto SupplierDto { get; set; }
    }
}