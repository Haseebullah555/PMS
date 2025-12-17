using Application.Dtos.Common;

namespace Application.Dtos.FuelDistribution
{
    public class FuelDistributionDto: BaseDto
    {
        public int FuelGunId { get; set; }
        public FuelTypeDto? FuelType { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}