using System.ComponentModel.DataAnnotations;
using Domain.Common;
using Domain.Enums;

namespace Domain.Models
{
    public class FuelTypes : BaseDomainEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public FuelUnits FuelUnit { get; set; }
    }
}