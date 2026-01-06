using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos.FuelStandDtos
{
    public class UpdateFuelStandDto : UpdateBaseDto
    {
        [Display(Name = "Fuel Stand Name"), Required(ErrorMessage = "Fuel Stand Name is required")]
        public string Name { get; set; }
        public int StaffId { get; set; }
        public StaffDto? Staffs { get; set; }
        public ICollection<FuelGunDto> FuelGuns { get; set; } = new List<FuelGunDto>();
    }
}