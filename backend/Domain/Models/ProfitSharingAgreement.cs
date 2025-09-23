using Domain.Common;

namespace Domain.Models
{
    public class ProfitSharingAgreement : BaseDomainEntity
    {
        public int PartnerId { get; set; }
        public Partner Partner { get; set; } = null!;

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; } // nullable if ongoing

        public decimal SharePercentage { get; set; } // e.g., 30% of profits/losses
    }
}