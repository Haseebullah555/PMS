using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class FuelStandDto : BaseDto
    {
        [Display(Name = "Fuel Stand Name"), Required(ErrorMessage = "Fuel Stand Name is required")]
        public string Name { get; set; }
        public int StaffId { get; set; }
    }
}