using Application.Dtos.Common;
using Application.Dtos.FuelGun;

namespace Application.Dtos.FuelDistribution
{
    public class GetFuelStandWithDetialsDto : CreateBaseDto
    {
        public string Name { get; set; }
        public List<GetFuelGunWithFuelDistributionDto> FuelGuns { get; set; }
    }
}