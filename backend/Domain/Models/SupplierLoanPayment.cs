using Domain.Common;

namespace Domain.Models
{
    public class SupplierLoanPayment : BaseDomainEntity
    {
        public int SupplierLoanId { get; set; }
        public SupplierLoan SupplierLoan { get; set; } = null!;
        public decimal PaidAmount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}