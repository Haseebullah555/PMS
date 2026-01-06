using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Domain.Enums;

namespace Application.Dtos.FuelTypeDtos
{
    public class UpdateFuelTypeDto : UpdateBaseDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public FuelUnits FuelUnit { get; set; }
    }
}