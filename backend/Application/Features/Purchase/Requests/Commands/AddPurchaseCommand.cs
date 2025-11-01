using Application.Dtos;
using MediatR;

namespace Application.Features.Purchase.Requests.Commands
{
    public class AddPurchaseCommand : IRequest<int>
    {
        public int SupplierId { get; set; }
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
        public decimal PaidAmount { get; set; }
        public List<PurchaseItemDto> Items { get; set; } = new();
    }
}