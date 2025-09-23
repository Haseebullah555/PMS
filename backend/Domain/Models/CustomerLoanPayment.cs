using Domain.Common;

namespace Domain.Models
{
    public class CustomerLoanPayment : BaseDomainEntity
    {
        public int CustomerLoanId { get; set; }
        public CustomerLoan CustomerLoan { get; set; } = null!;
        public decimal PaidAmount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}