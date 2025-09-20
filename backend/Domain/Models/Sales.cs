using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Sales : BaseDomainEntity
    {
        [Required]
        public int CustomerId { get; set; }
        [ForeignKey(nameof(CustomerId))]
        public Customer? Customer { get; set; }
        [Required]
        public int FuelTypeId { get; set; }
        [ForeignKey(nameof(FuelTypeId))]
        public FuelTypes? FuelType { get; set; }
        [Required]
        public DateOnly SaleDate { get; set; }
        [Required]
        public double Quantity { get; set; }
        [Required]
        public double UnitPrice { get; set; }
        [Required]
        public double TotalPrice { get; set; }
        public double Discount { get; set; }
        public string? Remarks { get; set; }
    }
}