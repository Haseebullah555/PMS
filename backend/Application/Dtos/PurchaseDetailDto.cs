namespace Application.Dtos
{
    public class PurchaseDetailDto
    {
        public int FuelTypeId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}