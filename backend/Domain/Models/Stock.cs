using Domain.Common;

namespace Domain.Models
{
    public class Stock : BaseDomainEntity
    {
        public int FuelTypeId { get; set; }
        public FuelTypes? FuelType { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public ICollection<PurchaseDetail> Purchases { get; set; } = new List<PurchaseDetail>();
        public ICollection<SaleDetail> Sales { get; set; } = new List<SaleDetail>();
    }
}