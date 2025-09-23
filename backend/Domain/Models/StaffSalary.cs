using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Common;

namespace Domain.Models
{
    public class StaffSalary : BaseDomainEntity
    {
        [Required]
        public int StaffId { get; set; }
        [ForeignKey(nameof(StaffId))]
        public Staff? Staff { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateOnly Date { get; set; }
    }
}