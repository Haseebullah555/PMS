using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelGunDtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFuelGunRepository : IGenericRepository<FuelGun>
    {
        Task<List<FuelGunListDto>> GetAllFuelGuns();
        Task<FuelGunListDto> GetFuelGunById(int id);
        Task<FuelGun> GetFuelGunByAyncId(int id);
    }
}