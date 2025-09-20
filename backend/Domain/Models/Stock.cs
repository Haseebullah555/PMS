
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class Stock : BaseDomainEntity
    {
        public int FuelTypeId { get; set; }
        [ForeignKey(nameof(FuelTypeId))]
        public FuelTypes? FuelType { get; set; }
        public double Quantity { get; set; }
        
    }
}