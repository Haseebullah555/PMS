using Domain.Common;

namespace Domain.Models
{
    public class FuelStand : BaseDomainEntity
    {
        public string Name { get; set; }
        public ICollection<FuelGun> FuelGuns { get; set; } = new List<FuelGun>();

    }
}