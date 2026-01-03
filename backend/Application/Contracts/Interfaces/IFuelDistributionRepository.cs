using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFuelDistributionRepository: IGenericRepository<FuelDistribution>
    {
        IQueryable<FuelStand> GetFuelStandWithDetails();
        IQueryable<FuelDistribution> GetListOfFuelDistributions();

        Task<FuelDistribution?> GetLastRecordByFuelGunId(int fuelGunId);
        
    }
}