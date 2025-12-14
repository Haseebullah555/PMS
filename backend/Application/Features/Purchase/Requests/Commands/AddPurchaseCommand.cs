using Application.Dtos;
using MediatR;

namespace Application.Features.Purchase.Requests.Commands
{
    public class AddPurchaseCommand : IRequest<int>
    {
        public int SupplierId { get; set; }
        public DateOnly PurchaseDate { get; set; }
        public decimal PaidAmount { get; set; }
        public string? Remarks { get; set; }
        
        public List<PurchaseItemDto> Items { get; set; } = new();
    }
}