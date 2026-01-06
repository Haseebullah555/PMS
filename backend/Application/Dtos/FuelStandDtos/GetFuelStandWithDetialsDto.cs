using Application.Dtos.Common;
using Application.Dtos.FuelGunDtos;

namespace Application.Dtos.FuelDistribution
{
    public class GetFuelStandWithDetialsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<GetFuelGunWithFuelDistributionDto> FuelGuns { get; set; }
    }
}