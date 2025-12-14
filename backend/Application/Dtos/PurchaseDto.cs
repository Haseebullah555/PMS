using Application.Dtos.Common;

namespace Application.Dtos
{
    public class PurchaseDto : BaseDto
    {
        public int SupplierId { get; set; }
        public string? SupplierName { get; set; }

        public DateOnly PurchaseDate { get; set; }

        public decimal TotalAmount { get; set; }     // sum of details
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }
        public decimal Density { get; set; }
        public List<PurchaseDetailDto> PurchaseDetails { get; set; }
    }
}