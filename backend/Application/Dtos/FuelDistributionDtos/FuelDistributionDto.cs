using Application.Dtos.Common;
using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelTypeDtos;

namespace Application.Dtos.FuelDistribution
{
    public class FuelDistributionDto
    {
        public int Id { get; set; }
        public int FuelGunId { get; set; }
        public FuelGunDto? FuelGun { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}