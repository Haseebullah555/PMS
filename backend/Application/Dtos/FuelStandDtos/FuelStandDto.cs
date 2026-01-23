using Application.Dtos.FuelGunDtos;
using Application.Dtos.StaffDtos;

namespace Application.Dtos.FuelStandDtos
{
    public class FuelStandDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<FuelGunDto> FuelGuns { get; set; } = new List<FuelGunDto>();
    }
}