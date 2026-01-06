using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class CustomerDto : BaseDto
    {
        [Display(Name = "Supplier Name"), Required(ErrorMessage = "Supplier Name is required")]
        public string Name { get; set; }
        [Display(Name = "Phone Number"), Required(ErrorMessage = "Phone number is required")]
        public string? PhoneNumber { get; set; }
        [Display(Name = "Address")]
        public string? Address { get; set; }

        [Display(Name = "Balance")]
        public decimal Balance { get; set; } = 0m;
    }
}