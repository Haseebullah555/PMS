using Application.Dtos.FuelDistribution;
using Application.Dtos.FuelDistributionDtos;

namespace Application.Dtos.FuelGunDtos
{
    public class GetFuelGunWithFuelDistributionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public decimal Balance { get; set; }
        public List<FuelDistributionDto> FuelDistributions { get; set; }
    }
}