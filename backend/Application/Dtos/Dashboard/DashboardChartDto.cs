namespace Application.Dtos.Dashboard
{
    public class DashboardChartDto
    {
        public int FuelTypeId { get; set; }
        public string FuelTypeName { get; set; }
        public int Month { get; set; } // 1 = Jan, 12 = Dec
        public decimal TotalSoldAmount { get; set; }
    }
}