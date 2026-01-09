using Application.Dtos.FuelGunDtos;

namespace Application.Dtos.FuelDistributionDtos
{
    public class GetFuelStandWithDetialsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StaffId { get; set; }
        public List<GetFuelGunWithFuelDistributionDto> FuelGuns { get; set; }
    }
}