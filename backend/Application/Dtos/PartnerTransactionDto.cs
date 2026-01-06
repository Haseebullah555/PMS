using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Domain.Enums;

namespace Application.Dtos
{
    public class PartnerTransactionDto
    {
        public int Id { get; set; }
        [Display(Name = "Partner"), Required(ErrorMessage = "{0} is required")]
        public int PartnerId { get; set; }
        public string? Partner { get; set; } = null!;
        [Display(Name = "Amount"), Required(ErrorMessage = "{0} is required")]
        public decimal Amount { get; set; }
        [Display(Name = "Transaction Type"), Required(ErrorMessage = "{0} is required")]
        public TransactionType Type { get; set; } // Enum: Deposit, Withdrawal
        [Display(Name = "Date"), Required(ErrorMessage = "{0} is required")]
        public DateOnly Date { get; set; }
    }
}