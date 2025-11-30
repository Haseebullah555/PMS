namespace Application.Dtos
{
    public class PurchaseDetailDto
    {
        public int PurchaseId { get; set; }
        public string? Purchase { get; set; }

        public int FuelTypeId { get; set; }
        public string? FuelType { get; set; }

        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}