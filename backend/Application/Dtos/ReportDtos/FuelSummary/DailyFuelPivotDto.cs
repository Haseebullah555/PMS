namespace Application.Dtos.ReportDtos.FuelSummary
{
    public class DailyFuelPivotDto
    {
        public DateOnly Date { get; set; }
        public decimal GasLPG { get; set; }
        public decimal Petrol92 { get; set; }
        public decimal Petrol80 { get; set; }
        public decimal Diesel { get; set; }
        public decimal Petrol95 { get; set; }
    }
}