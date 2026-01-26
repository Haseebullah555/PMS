using Domain.Common;

namespace Domain.Models
{
    public class FinancialTransaction : BaseDomainEntity
    {
        public DateOnly Date { get; set; }

        // Purchase, Sale, Expense, SupplierLoanPayment, CustomerPayment
        public string Type { get; set; } = default!;

        public int ReferenceId { get; set; }   // PurchaseId, SaleId, etc.

        // Supplier / Customer / Internal
        public string PartyType { get; set; } = default!;
        public int PartyId { get; set; }

        public decimal Amount { get; set; }

        // IN / OUT
        public string Direction { get; set; } = default!;

        public string? Remarks { get; set; }
    }

}