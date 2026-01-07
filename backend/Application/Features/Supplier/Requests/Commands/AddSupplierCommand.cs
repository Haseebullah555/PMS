using Application.Dtos.SupplierDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddSupplierCommand : IRequest
    {
        public AddSupplierDto AddSupplierDto { get; set; }
    }
}