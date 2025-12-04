using Domain.Common;

namespace Domain.Models
{
    public class SupplierLoanPayment : BaseDomainEntity
    {
        public int PurchaseId { get; set; }
        public Purchase? Purchase { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}
