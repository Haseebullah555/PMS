namespace Application.Dtos.ReportDtos.DailyFuelSellReportDtos
{
    public class DailyFuelSellReportDto
    {
        public DateOnly Date { get; set; }
        public decimal TotalQuantity { get; set; }
        public decimal TotalAmount { get; set; }
    }
}