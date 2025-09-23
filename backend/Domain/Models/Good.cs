using Domain.Common;

namespace Domain.Models
{
    public class Good : BaseDomainEntity
    {
        public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string Unit { get; set; } = null!; // e.g., piece, kg, liter
    public decimal CostPrice { get; set; } // purchase price
    public decimal SellPrice { get; set; } // selling price

    // Navigation properties
    public ICollection<PurchaseDetail> PurchaseDetails { get; set; } = new List<PurchaseDetail>();
    public ICollection<SaleDetail> SaleDetails { get; set; } = new List<SaleDetail>();
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
    }
}