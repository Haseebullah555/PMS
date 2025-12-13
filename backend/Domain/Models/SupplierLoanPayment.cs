using Domain.Common;

namespace Domain.Models
{
    public class SupplierLoanPayment : BaseDomainEntity
    {
        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}


// using Domain.Common;

// namespace Domain.Models
// {
//     public class SupplierLoanPayment : BaseDomainEntity
//     {
//         public int PurchaseId { get; set; }
//         public Purchase? Purchase { get; set; }
//         public decimal PaidLoanAmount { get; set; }
//         public DateOnly PaymentDate { get; set; }
//     }
// }
