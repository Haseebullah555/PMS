using Application.Dtos.Common;

namespace Application.Dtos.FuelDistribution
{
    public class UpdateFuelDistributionDto : UpdateBaseDto
    {
        public int FuelGunId { get; set; }
        public int FuelTypeId { get; set; }
        public int Quantity { get; set; }
        public DateOnly? DistributionDate { get; set; }

    }
}