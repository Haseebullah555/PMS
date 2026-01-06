using Application.Dtos.Common;
using Application.Dtos.FuelDistributionDtos;
using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelStandDtos;

namespace Application.Dtos.DailyFuelSellDtos
{
    public class AddDailyFuelSellDto : CreateBaseDto
    {
        public int FuelStandId { get; set; }
        public FuelStandDto? FuelStand { get; set; }
        public int FuelGunId { get; set; }
        public FuelGunDto? FuelGun { get; set; }
        public int StaffId { get; set; }
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