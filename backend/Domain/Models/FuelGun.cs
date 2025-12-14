using Domain.Common;

namespace Domain.Models
{
    public class FuelGun : BaseDomainEntity
    {
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public FuelStand? FuelStand { get; set; }
        public ICollection<FuelDistribution> FuelDistributions { get; set; } = new List<FuelDistribution>();
    }
}