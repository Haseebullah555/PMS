
using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdatePurchaseCommand : IRequest<int>
    {
        public int Id { get; set; } 
        public int SupplierId { get; set; }
        public DateOnly PurchaseDate { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal UnpaidAmount { get; set; }

        public List<PurchaseItemDto> Items { get; set; } = new();
    }
}