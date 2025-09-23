using Domain.Common;
using Domain.Enums;

namespace Domain.Models
{
    public class CapitalTransaction : BaseDomainEntity
    {
        public int PartnerId { get; set; }
        public Partner Partner { get; set; } = null!;

        public decimal Amount { get; set; }
        public TransactionType Type { get; set; } // Deposit or Withdrawal
        public DateTime Date { get; set; }
    }
}