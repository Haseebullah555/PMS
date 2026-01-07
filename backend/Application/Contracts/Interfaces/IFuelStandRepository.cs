using Application.Contracts.Interfaces.Common;
using Application.Dtos.FuelStandDtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IFuelStandRepository : IGenericRepository<FuelStand>
    {
        IQueryable<FuelStand> GetAllFuelStands();

        Task<FuelStandDto> GetFuelStandById(int id);   
    }
}