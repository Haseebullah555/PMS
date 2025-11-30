namespace Application.Dtos
{
    public class PurchaseDetailDto
    {
        public int GoodId { get; set; }
        public string? GoodName { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public decimal TotalPrice { get; set; }   // Quantity * UnitPrice
    }
}