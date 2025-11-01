namespace Application.Dtos
{
    public class PurchaseItemDto
    {
        public int GoodId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}