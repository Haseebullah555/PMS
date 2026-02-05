using Domain.Common;

namespace Domain.Models
{
   public class Purchase : BaseDomainEntity
{
    public int SupplierId { get; set; }
    public Supplier? Supplier { get; set; }
    public DateOnly PurchaseDate { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal UnPaidAmount { get; set; }
    public int CurrencyId { get; set; }
    public Currency? Currency { get; set; }
    public decimal ExchageRate { get; set; }
    public string? Remarks { get; set; }

    public ICollection<PurchaseDetail> PurchaseDetails { get; set; } = new List<PurchaseDetail>();

}
}