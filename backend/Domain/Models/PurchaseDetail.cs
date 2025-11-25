using Domain.Common;

namespace Domain.Models
{
    public class PurchaseDetail : BaseDomainEntity
    {
        public int PurchaseId { get; set; }
        public Purchase? Purchase { get; set; }
        public int FuelTypeId { get; set; }
        public FuelTypes? FuelType { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}