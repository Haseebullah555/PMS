using Domain.Common;

namespace Domain.Models
{
    public class SalaryPayment : BaseDomainEntity
    {
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;
        public decimal PaidAmount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}