using System.ComponentModel.DataAnnotations;
using Domain.Common;

namespace Domain.Models
{
    public class ExtraExpenses : BaseDomainEntity
    {
        [Required]
        public double Amount { get; set; }
        [Required]
        public DateOnly ExpenseDate { get; set; }
        public string? Remarks { get; set; }
    }
}