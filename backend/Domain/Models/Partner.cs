using Domain.Common;

namespace Domain.Models
{
    public class Partner : BaseDomainEntity
    {
        public string FullName { get; set; } = null!;
        public decimal InitialInvestment { get; set; }

        public ICollection<PartnerTransaction> Transactions { get; set; } = new List<PartnerTransaction>();
    }
}