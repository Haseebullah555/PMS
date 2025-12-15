using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Common;

namespace Application.Dtos.FuelDistribution
{
    public class FuelDistributionDto: BaseDto
    {
        public int FuelGunId { get; set; }
        public FuelTypeDto FuelTypeId { get; set; }
        public int Quantity { get; set; }
        public DateOnly DistributionDate { get; set; }
    }
}