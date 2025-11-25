using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Sale : BaseDomainEntity
    {
        [Required]
        public int CustomerId { get; set; }
        [ForeignKey(nameof(CustomerId))]
        public Customer? Customer { get; set; }
        [Required]
        public int FuelGunId { get; set; }
        [ForeignKey(nameof(FuelGunId))]
        public FuelGun? FuelGun { get; set; }
        [Required]
        public DateOnly SaleDate { get; set; }
        [Required]
        public double Quantity { get; set; }
        [Required]
        public double UnitPrice { get; set; }
        public double Discount { get; set; }
        public string? Remarks { get; set; }
        public decimal PaidAmount { get; set; }

        public ICollection<SaleDetail> Details { get; set; } = new List<SaleDetail>();
    }
}