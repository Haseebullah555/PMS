using Domain.Common;

namespace Domain.Models
{
    public class Customer : BaseDomainEntity
    {
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public decimal Balance { get; set; }
        public ICollection<CustomerLoan>? CustomerLoans { get; set; } = new List<CustomerLoan>();
        public ICollection<CustomerLoanPayment>? CustomerLoanPayments { get; set; } = new List<CustomerLoanPayment>();
    }
}