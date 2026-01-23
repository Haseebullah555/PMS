using Domain.Common;

namespace Domain.Models
{
    public class StockMovement : BaseDomainEntity
    {
        public int FuelTypesId { get; set; }
        public FuelType? FuelTypes { get; set; }

        public int WarehouseId { get; set; }
        public Warehouse? Warehouse { get; set; }

        public int Quantity { get; set; }
        public string Direction { get; set; } // "IN" or "OUT"
        public DateTime Date { get; set; }
        public string RefType { get; set; } // Purchase, Sale, Adjustment
        public int RefId { get; set; } // PurchaseId, SaleId, etc.
    }
}