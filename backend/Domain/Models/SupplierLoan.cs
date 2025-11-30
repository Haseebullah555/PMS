using Domain.Common;

namespace Domain.Models
{
    public class SupplierLoan : BaseDomainEntity
    {
        public int PurchaseId { get; set; }
        public Purchase? Purchase { get; set; }
        public decimal Amount { get; set; }
        public DateTime LoanDate { get; set; }
        public bool IsSettled { get; set; }


        public ICollection<SupplierLoanPayment> Payments { get; set; } = new List<SupplierLoanPayment>();
    }
}