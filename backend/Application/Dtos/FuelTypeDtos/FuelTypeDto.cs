using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.Dtos.FuelTypeDtos
{
    public class FuelTypeDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public FuelUnits FuelUnit { get; set; }
    }
}