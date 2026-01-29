namespace Application.Dtos.ReportDtos.FuelSummary
{
    public class DailyFuelDynamicDto
    {
        public List<DailyFuelSalesDto> Sales { get; set; } = new();
        public Dictionary<string, decimal> Purchases { get; set; } = new();
        public Dictionary<string, decimal> Stock { get; set; } = new();
    }
}