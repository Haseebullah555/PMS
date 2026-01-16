using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelTypeDtos;

namespace Application.Dtos.FuelDistributionDtos
{
    public class FuelDistributionDto
    {
        public int Id { get; set; }
        public int FuelTypeId { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}