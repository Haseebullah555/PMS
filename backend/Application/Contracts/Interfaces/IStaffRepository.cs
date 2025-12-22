using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IStaffRepository : IGenericRepository<Staff>
    {       
          Task<FuelStand?> GetFuelStandByIdAsync(int fuelStandId);
    }
}