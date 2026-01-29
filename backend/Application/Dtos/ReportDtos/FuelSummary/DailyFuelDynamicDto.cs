namespace Application.Dtos.ReportDtos.FuelSummary
{
    public class DailyFuelDynamicDto
    {
        public DateOnly Date { get; set; }
        public Dictionary<string, decimal> FuelTypes { get; set; } = new();
    }
}