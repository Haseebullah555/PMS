using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Purchase : BaseDomainEntity
    {
        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }
        [Required]
        public int FuelTypeId { get; set; }
        [ForeignKey(nameof(FuelTypeId))]
        public FuelTypes? FuelType { get; set; }
        [Required]
        public DateOnly PurchaseDate { get; set; }
        [Required]
        public double Quantity { get; set; }
        [Required]
        public double UnitPrice { get; set; }
        [Required]
        public double PaidAmount { get; set; }
        public string? Remarks { get; set; }
        public decimal Density { get; set; }
        public ICollection<PurchaseDetail>? PurchaseDetails  { get; set; } = new List<PurchaseDetail>();
    }
}