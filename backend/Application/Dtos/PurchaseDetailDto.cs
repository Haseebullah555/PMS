namespace Application.Dtos
{
    public class PurchaseDetailDto
    {
        public int FuelTypeId { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Density { get; set; }

    }
}