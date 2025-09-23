using Domain.Common;
using Domain.Enums;

namespace Domain.Models
{
    public class PartnerTransaction : BaseDomainEntity
    {
        public int PartnerId { get; set; }
        public Partner Partner { get; set; } = null!;

        public decimal Amount { get; set; }
        public TransactionType Type { get; set; } // Enum: Deposit, Withdrawal
        public DateTime Date { get; set; }
    }
}