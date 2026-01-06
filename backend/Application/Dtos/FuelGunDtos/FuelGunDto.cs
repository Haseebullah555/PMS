using Application.Dtos.FuelDistribution;

namespace Application.Dtos.FuelGunDtos
{
    public class FuelGunDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FuelStandId { get; set; }

        public decimal? Balance { get; set; }
        public List<FuelDistributionDto>? GetFuelDistributions { get; set; }
    }
}