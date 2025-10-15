using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class PartnerDto : BaseDto
    {
        [Display(Name = "Full Name"), Required(ErrorMessage = "{0} is required")]
        public string FullName { get; set; } = null!;
        [Display(Name = "Initial Investment"), Required(ErrorMessage = "{0} is required")]
        public decimal InitialInvestment { get; set; }
        [Display(Name = "Ownership Percentage"), Required(ErrorMessage = "{0} is required")]
        public decimal OwnershipPercentage { get; set; } // e.g. 25%, 40%
    }
}