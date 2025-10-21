using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class StaffPayment : BaseDomainEntity
    {
        [Required]
        public int StaffId { get; set; }
        [ForeignKey(nameof(StaffId))]
        public Staff? Staff { get; set; }
        public DateOnly PaymentDate { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }
        public string? Remarks { get; set; }
        
    }
}