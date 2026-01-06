using Application.Dtos.Common;

namespace Application.Dtos.FuelDistribution
{
    public class FuelDistributionDto : CreateBaseDto
    {
        public int FuelGunId { get; set; }
        public FuelGunDto? FuelGun { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}