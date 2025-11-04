using Application.Dtos;
using MediatR;

namespace Application.Features.Purchase.Requests.Queries
{
    public class GetPurchaseByIdRequest : IRequest<PurchaseDto>
    {
        public int PurchaseId { get; set; }
    }
}