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
        public double Salary { get; set; }
        public ICollection<SalaryPayment> SalaryPayments { get; set; } = new List<SalaryPayment>();
    }
}