using Domain.Common;

namespace Domain.Models
{
    public class DailyFuelSell: BaseDomainEntity
    {
        public int FuelStandId { get; set; }
        public FuelStand? FuelStand { get; set; }
        public int FuelGunId { get; set; }
        public FuelGun? FuelGun { get; set; } 
        public decimal CurrentMeterDegree { get; set; }
        public decimal OldMeterDegree { get; set; }
        public decimal SoldFuelAmount { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal CollectedMoney { get; set; }
        public DateOnly? Date { get; set; }    
        public string? Note { get; set; } 
    }
}