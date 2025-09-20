using Domain.Common;
using Domain.Enums;

namespace Domain.Models
{
    public class Customer : BaseDomainEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public CustomerType CustomerType { get; set; }
    }
}