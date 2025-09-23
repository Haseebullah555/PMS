using Domain.Common;

namespace Domain.Models
{
    public class FinancialTransaction : BaseDomainEntity
    {
        public DateTime Date { get; set; }
        public string Type { get; set; } = null!; // Sale, Purchase, Expense, Salary, Loan, Capital
        public int? ReferenceId { get; set; } // PurchaseId, SaleId, SalaryId, etc.
        public string? PartyType { get; set; } // Customer, Supplier, Staff, Partner
        public int? PartyId { get; set; } // FK to Party

        public decimal Amount { get; set; }
        public string Direction { get; set; } = null!; // "IN" or "OUT"
    }
}