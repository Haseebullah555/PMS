using Application.Dtos.PurchaseDtos;
using MediatR;

namespace Application.Features.Purchase.Requests.Commands
{
    public class AddPurchaseCommand : IRequest<int>
    {
        public int SupplierId { get; set; }
        public DateOnly PurchaseDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal UnPaidAmount { get; set; }
        public string? Remarks { get; set; }

        public List<PurchaseItemDto> Items { get; set; } = new();
    }
}