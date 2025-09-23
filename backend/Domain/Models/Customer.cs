using Domain.Common;
using Domain.Enums;

namespace Domain.Models
{
    public class Customer : BaseDomainEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public ICollection<Sale> Sales { get; set; } = new List<Sale>();
        public ICollection<CustomerLoan> Loans { get; set; } = new List<CustomerLoan>();
    }
}