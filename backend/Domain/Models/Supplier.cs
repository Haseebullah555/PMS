using Domain.Common;

namespace Domain.Models
{
    public class Supplier : BaseDomainEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string DriverName { get; set; }
        public string CarPlate { get; set; }
        public decimal Balance { get; set; }
        public ICollection<Purchase> Purchases { get; set; } = new List<Purchase>();
        public ICollection<SupplierLoanPayment> SupplierLoanPayments { get; set; } = new List<SupplierLoanPayment>();

    }
}