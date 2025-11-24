using Domain.Common;

namespace Domain.Models
{
    public class StockMovement : BaseDomainEntity
    {
        public int GoodId { get; set; }
        public Good? Good { get; set; }

        public int WarehouseId { get; set; }
        public Warehouse? Warehouse { get; set; }

        public int Quantity { get; set; }
        public string Direction { get; set; } // "IN" or "OUT"
        public DateTime Date { get; set; }
        public string RefType { get; set; } // Purchase, Sale, Adjustment
        public int RefId { get; set; } // PurchaseId, SaleId, etc.
    }
}