using Application.Dtos.SupplierDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateSupplierCommand : IRequest
    {
        public UpdateSupplierDto UpdateSupplierDto { get; set; }
    }
}