namespace Application.Dtos
{
    public class PurchaseItemDto
    {
        public int FuelTypeId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Density { get; set; }
    }
}