using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Purchase : BaseDomainEntity
    {
        [Required]
        public int SupplierId { get; set; }
        [ForeignKey(nameof(SupplierId))]
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
        public double TotalPrice { get; set; }
        [Required]
        public double PaidAmount { get; set; }
        [Required]
        public double UnpaidAmount { get; set; }
        public string? Remarks { get; set; }
    }
}