using Domain.Common;

namespace Domain.Models
{
    public class FuelDistribution : BaseDomainEntity
    {
        public int FuelGunId { get; set; }  
        public FuelGun FuelGun { get; set; }
        public int FuelTypeId { get; set; }
        public FuelTypes FuelTypes { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}