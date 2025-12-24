
using Application.Contracts.Interfaces;
using Application.Dtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelGunRepository : GenericRepository<FuelGun>, IFuelGunRepository
    {
        private readonly AppDbContext _context;
        public FuelGunRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<FuelGunDto>> GetAllFuelGuns()
        {
            var fuelGuns = _context.FuelGuns
            .Select(fg => new FuelGunDto
            {
                Id = fg.Id,
                Name = fg.Name,
                // FuelTypeId = fg.FuelTypeId,
                // FuelType = fg.FuelType.Name,
                // FuelStand = fg.FuelStand.Name,
                FuelStandId = fg.FuelStandId,
                // Quantity = fg.Quantity
            }).ToList();
            return fuelGuns;
        }

        public Task<FuelGunDto> GetFuelGunById(int id)
        {
            var fuelGun = _context.FuelGuns
            .Where(fg => fg.Id == id)
            .Select(fg => new FuelGunDto
            {
                Id = fg.Id,
                Name = fg.Name,
                // FuelTypeId = fg.FuelTypeId,
                // FuelType = fg.FuelType.Name,
                // FuelStand = fg.FuelStand.Name,
                FuelStandId = fg.FuelStandId,
                // Quantity = fg.Quantity
            }).FirstOrDefaultAsync();
            return fuelGun;
        }

          public async Task<FuelGun?> GetFuelGunByAyncId(int id)
        {
            return await _context.FuelGuns
                .FirstOrDefaultAsync(fg => fg.Id == id);
        }
    }
}