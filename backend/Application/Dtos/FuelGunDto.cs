using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;

namespace Application.Dtos
{
    public class FuelGunDto : BaseDto
    {
        public string Name { get; set; }
        public int FuelStandId { get; set; }
        public List<FuelDistributionDto>? GetFuelDistributions { get; set; }
    }
}