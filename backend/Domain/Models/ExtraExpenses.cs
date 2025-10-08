using Domain.Common;

namespace Domain.Models
{
    public class ExtraExpenses : BaseDomainEntity
    {
        // [Required]
        // public double Amount { get; set; }
        // [Required]
        // public DateOnly ExpenseDate { get; set; }
        // public string? Remarks { get; set; }
        public string ExpenseType { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string? Notes { get; set; }
    }
}