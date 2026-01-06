using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos.ExtraExpenseDtos
{
    public class UpdateExtraExpenseDto : UpdateBaseDto
    {
        [Display(Name = "Expense Details"), Required(ErrorMessage = "{0} is required")]
        public string ExpenseType { get; set; } = null!;
        [Display(Name = "Amount"), Required(ErrorMessage = "{0} is required")]
        public decimal Amount { get; set; }
        [Display(Name = "Date"), Required(ErrorMessage = "{0} is required")]
        public DateOnly ExpenseDate { get; set; }
        [Display(Name = "Expense Details")]
        public string? Notes { get; set; }
    }
}