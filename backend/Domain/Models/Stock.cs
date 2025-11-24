using Domain.Common;

namespace Domain.Models
{
    public class Stock : BaseDomainEntity
    {
        public int GoodId { get; set; }
        public Good? Good { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }

        public ICollection<PurchaseDetail> Purchases { get; set; } = new List<PurchaseDetail>();
        public ICollection<SaleDetail> Sales { get; set; } = new List<SaleDetail>();
    }
}