using Domain.Common;

namespace Domain.Models
{
    public class ExtraExpenses : BaseDomainEntity
    {
        public string ExpenseType { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateOnly ExpenseDate { get; set; }
        public string? Notes { get; set; }
    }
}