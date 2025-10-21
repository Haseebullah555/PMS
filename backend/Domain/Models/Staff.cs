using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Models
{
    public class Staff : BaseDomainEntity
    {
        [Required]
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Phone { get; set; }
        [Required]
        public decimal Salary { get; set; }
        [Required]
        public DateOnly HireDate { get; set; }
        public bool Status { get; set; }
        public ICollection<StaffPayment> SalaryPayments { get; set; } = new List<StaffPayment>();
    }
}