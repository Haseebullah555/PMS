using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelTypeDtos;

namespace Application.Dtos.FuelDistributionDtos
{
    public class FuelDistributionDto
    {
        public int Id { get; set; }
        public int FuelGunId { get; set; }
        public FuelGunListDto? FuelGun { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}