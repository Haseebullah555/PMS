using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Purchase : BaseDomainEntity
    {
        // [Required]
        // public int SupplierId { get; set; }
        // [ForeignKey(nameof(SupplierId))]
        // public Supplier? Supplier { get; set; }
        // [Required]
        // public int FuelTypeId { get; set; }
        // [ForeignKey(nameof(FuelTypeId))]
        // public FuelTypes? FuelType { get; set; }
        // [Required]
        // public DateOnly PurchaseDate { get; set; }
        // [Required]
        // public double Quantity { get; set; }
        // [Required]
        // public double UnitPrice { get; set; }
        // [Required]
        // public double TotalPrice { get; set; }

        // [Required]
        // public double PaidAmount { get; set; }
        // [Required]
        // public double UnpaidAmount { get; set; }
        // public string? Remarks { get; set; }
        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }
        public DateOnly PurchaseDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }// should remove

        public ICollection<PurchaseDetail>? PurchaseDetails  { get; set; } = new List<PurchaseDetail>();
    }
}