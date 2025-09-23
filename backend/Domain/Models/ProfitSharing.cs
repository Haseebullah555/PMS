using Domain.Common;

namespace Domain.Models
{
    public class ProfitSharing : BaseDomainEntity
    {
        public int AgreementId { get; set; }
        public ProfitSharingAgreement Agreement { get; set; } = null!;

        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }

        public decimal ProfitOrLossAmount { get; set; } // The total profit/loss of the business
        public decimal PartnerShareAmount { get; set; } // This partner’s share
        public DateTime DistributionDate { get; set; }
    }
}