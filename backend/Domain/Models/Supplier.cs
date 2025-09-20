using Domain.Common;

namespace Domain.Models
{
    public class Supplier : BaseDomainEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        
    }
}