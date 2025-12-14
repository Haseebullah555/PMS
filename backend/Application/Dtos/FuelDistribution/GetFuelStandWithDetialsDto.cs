using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Common;

namespace Application.Dtos.FuelDistribution
{
    public class GetFuelStandWithDetialsDto: BaseDto
    {
        public string Name { get; set; }
        public List<FuelGunDto> FuelGun { get; set; }
    }
}