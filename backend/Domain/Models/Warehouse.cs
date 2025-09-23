using Domain.Common;

namespace Domain.Models
{
    public class Warehouse : BaseDomainEntity
    {
        public string Name { get; set; } = null!;
        public string? Location { get; set; }

        // Navigation
        public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
    }
}