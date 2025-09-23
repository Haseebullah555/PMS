using Domain.Common;

namespace Domain.Models
{
    public class Supplier : BaseDomainEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public ICollection<Purchase> Purchases { get; set; } = new List<Purchase>();
        public ICollection<SupplierLoan> Loans { get; set; } = new List<SupplierLoan>();
    }
}