namespace Application.Dtos.Dashboard
{
    public class DashboardChartDto
    {
        public int FuelTypeId { get; set; }
        public string FuelTypeName { get; set; }
        public int ShamsiYear { get; set; }
        public int ShamsiMonth { get; set; } // 1–12 (حمل → حوت)
        public decimal TotalSoldAmount { get; set; }
    }
}