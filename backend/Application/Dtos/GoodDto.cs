using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class GoodDto : BaseDto
    {
        [Display(Name = "Name"), Required(ErrorMessage ="{0} is required")]
        public string Name { get; set; } = null!;
        [Display(Name = "Remarks")]
        public string? Description { get; set; }
        [Display(Name = "Unit"), Required(ErrorMessage ="{0} is required")]
        public string Unit { get; set; } = null!; // e.g., piece, kg, liter
        [Display(Name = "Purchase Price"), Required(ErrorMessage ="{0} is required")]
        public decimal CostPrice { get; set; } // purchase price
        [Display(Name = "Sell Price"), Required(ErrorMessage ="{0} is required")]
        public decimal SellPrice { get; set; } // selling price

        // Navigation properties
        // public ICollection<PurchaseDetail> PurchaseDetails { get; set; } = new List<PurchaseDetail>();
        // public ICollection<SaleDetail> SaleDetails { get; set; } = new List<SaleDetail>();
        // public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
    }
}