using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Domain.Models;

namespace Application.Dtos
{
    public class FuelGunDto : BaseDto
    {
        [Display(Name = "Fuel Gun Name"),Required(ErrorMessage ="Fuel Gun Name is required")]
        public string Name { get; set; }
        [Display(Name = "Fuel Type Name"),Required(ErrorMessage ="Fuel Type Name is required")]
        public int FuelTypeId { get; set; }
        public string? FuelType { get; set; }
        [Display(Name = "Fuel Stand Name"),Required(ErrorMessage ="Fuel Gun Stand is required")]
        public int FuelStandId { get; set; }
        public string? FuelStand { get; set; }
        [Display(Name = "Quantity"),Required(ErrorMessage ="Quantity is required")]
        public decimal Quantity { get; set; }
        public ICollection<FuelGunDto> FuelGunDtos { get; set; } = new List<FuelGunDto>();
    }
}