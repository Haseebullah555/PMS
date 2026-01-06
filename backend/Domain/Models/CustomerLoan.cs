using Domain.Common;

namespace Domain.Models
{
    public class CustomerLoan : BaseDomainEntity
    {
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public decimal Amount { get; set; }
        public DateTime LoanDate { get; set; }
        public bool? IsSettled { get; set; }
    }
}