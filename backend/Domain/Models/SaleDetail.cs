using Domain.Common;

namespace Domain.Models
{
    public class SaleDetail : BaseDomainEntity
    {
        public int SaleId { get; set; }
        public Sale? Sale { get; set; }

        public int StockId { get; set; }
        public Stock? Stock { get; set; }

        public int FuelTypeId { get; set; }
        public FuelType? FuelType { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}