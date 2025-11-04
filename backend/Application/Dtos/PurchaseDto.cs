using Application.Dtos.Common;

namespace Application.Dtos
{
    public class PurchaseDto : BaseDto
    {
        public int SupplierId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }

        public List<PurchaseDetailDto> Details { get; set; } = new();
    }
}