using Application.Dtos.Common;
using Application.Dtos.SupplierDtos;

namespace Application.Dtos.PurchaseDtos
{
    public class AddPurchaseDto : CreateBaseDto
    {
        public int SupplierId { get; set; }
        public SupplierDto? Supplier { get; set; }

        public DateOnly PurchaseDate { get; set; }

        public decimal TotalAmount { get; set; }     // sum of details
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }
        public decimal Density { get; set; }
        public List<PurchaseDetailDto> PurchaseDetails { get; set; }
    }
}