namespace Application.Dtos
{
    public class DailyFuelSellDto
    {
        public int Id { get; set; }
        public int FuelStandId { get; set; }
        public string? FuelStand { get; set; }
        public int FuelGunId { get; set; }
        public string? FuelGun { get; set; }
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