using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;

namespace Application.Dtos.FuelGun
{
    public class GetFuelGunWithFuelDistributionDto : CreateBaseDto
    {
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public decimal Balance { get; set; }
        public List<FuelDistributionDto> FuelDistributions { get; set; }
    }
}