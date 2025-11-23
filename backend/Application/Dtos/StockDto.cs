using Application.Dtos.Common;
using Domain.Common;

namespace Application.Dtos
{
    public class StockDto : BaseDto
    {
        public int GoodId { get; set; }
        public string? GoodName { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; } // optional (for valuation)

        public ICollection<PurchaseDetailDto> Purchases { get; set; } = new List<PurchaseDetailDto>();
        public ICollection<SaleDetailDto> Sales { get; set; } = new List<SaleDetailDto>();
    }
}