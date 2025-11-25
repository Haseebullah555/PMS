using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class FuelStandDto : BaseDto
    {
        [Display(Name = "Fuel Stand Name"), Required(ErrorMessage = "Fuel Stand Name is required")]
        public string Name { get; set; }
        [Display(Name = "Staff Name"), Required(ErrorMessage = "Staff Name is required")]
        public int StaffId { get; set; }
        public string? Staff { get; set; }
    }
}