using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFuelStandRepository : IGenericRepository<FuelStand>
    {
        IQueryable<FuelStandDto> GetAllFuelStands();

        Task<FuelStandDto> GetFuelStandById(int id);   
    }
}