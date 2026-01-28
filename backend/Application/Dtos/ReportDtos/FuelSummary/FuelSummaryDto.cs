namespace Application.Dtos.ReportDtos.FuelSummary
{
    public class FuelSummaryDto
    {
        public int FuelTypeId { get; set; }
        public string FuelTypeName { get; set; }
        public DateOnly Date { get; set; }
        public decimal SoldFuelAmount { get; set; }

    }
}