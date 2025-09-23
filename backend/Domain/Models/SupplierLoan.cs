using Domain.Common;

namespace Domain.Models
{
    public class SupplierLoan : BaseDomainEntity
    {
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; } = null!;
        public decimal Amount { get; set; }
        public DateTime LoanDate { get; set; }
        public bool IsSettled { get; set; }

        public ICollection<SupplierLoanPayment> Payments { get; set; } = new List<SupplierLoanPayment>();
    }
}