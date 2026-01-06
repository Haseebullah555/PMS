using Domain.Common;
namespace Domain.Models
{
    public class CustomerLoanPayment : BaseDomainEntity
    {
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}