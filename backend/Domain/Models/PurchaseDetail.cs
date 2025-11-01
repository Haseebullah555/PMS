using Domain.Common;

namespace Domain.Models
{
    public class PurchaseDetail : BaseDomainEntity
    {
        public int PurchaseId { get; set; }
        public Purchase? Purchase { get; set; }
        public int GoodId { get; set; }
        public Good? Good { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}