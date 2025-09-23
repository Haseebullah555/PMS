
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Stock : BaseDomainEntity
    {
        // public int FuelTypeId { get; set; }
        // [ForeignKey(nameof(FuelTypeId))]
        // public FuelTypes? FuelType { get; set; }
        // public double Quantity { get; set; }
        public string ItemName { get; set; } = null!;
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; } // optional (for valuation)

        public ICollection<PurchaseDetail> Purchases { get; set; } = new List<PurchaseDetail>();
        public ICollection<SaleDetail> Sales { get; set; } = new List<SaleDetail>();
    }
}