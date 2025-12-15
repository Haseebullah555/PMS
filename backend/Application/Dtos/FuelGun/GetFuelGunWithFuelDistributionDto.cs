using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;

namespace Application.Dtos.FuelGun
{
    public class GetFuelGunWithFuelDistributionDto: BaseDto
    {
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public List<FuelDistributionDto> FuelDistributions { get; set; }
    }
}