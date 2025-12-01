
using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdatePurchaseCommand : IRequest
    {
        public PurchaseDto PurchaseDto { get; set; }
    }
}