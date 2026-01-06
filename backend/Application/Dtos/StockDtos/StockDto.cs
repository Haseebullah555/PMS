namespace Application.Dtos.StockDtos
{
    public class StockDto
    {
        public int Id { get; set; }
        public int FuelTypeId { get; set; }
        public string? FuelTypeName { get; set; }
        public decimal QuantityInLiter { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }
    }
}