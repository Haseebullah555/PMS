using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelGunDtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFuelGunRepository : IGenericRepository<FuelGun>
    {
        Task<List<FuelGunDto>> GetAllFuelGuns();
        Task<FuelGunDto> GetFuelGunById(int id);
        Task<FuelGun> GetFuelGunByAyncId(int id);
    }
}