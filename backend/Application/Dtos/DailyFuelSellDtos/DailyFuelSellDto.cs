using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelStandDtos;
using Application.Dtos.FuelTypeDtos;
using Application.Dtos.StaffDtos;
using Domain.Models;

namespace Application.Dtos.DailyFuelSellDtos
{
    public class DailyFuelSellDto
    {
        public int Id { get; set; }
        public int FuelStandId { get; set; }
        public FuelStandDto? FuelStand { get; set; }
        public int FuelGunId { get; set; }
        public FuelGunDto? FuelGun { get; set; }
        public int FuelTypeId { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public int StaffId { get; set; }
        public StaffDto? Staff { get; set; }
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