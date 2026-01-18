using Domain.Common;

namespace Domain.Models
{
    public class FuelGun : BaseDomainEntity
    {
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public FuelStand? FuelStand { get; set; }

        public decimal? Balance { get; set; }
    }
}