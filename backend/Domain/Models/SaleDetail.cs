using Domain.Common;

namespace Domain.Models
{
    public class SaleDetail : BaseDomainEntity
    {
        public int SaleId { get; set; }
        public Sale Sale { get; set; } = null!;

        public int StockId { get; set; }
        public Stock Stock { get; set; } = null!;

        public int GoodId { get; set; }
        public Good Good { get; set; } = null!;

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}