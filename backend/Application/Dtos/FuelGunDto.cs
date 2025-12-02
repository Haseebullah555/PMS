using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class FuelGunDto : BaseDto
    {
        [Display(Name = "Fuel Gun Name"),Required(ErrorMessage ="Fuel Gun Name is required")]
        public string Name { get; set; }
        [Display(Name = "Fuel Type Name"),Required(ErrorMessage ="Fuel Type Name is required")]
        public int FuelTypeId { get; set; }
        [Display(Name = "Fuel Stand Name"),Required(ErrorMessage ="Fuel Gun Stand is required")]
        public int FuelStandId { get; set; }
    }
}