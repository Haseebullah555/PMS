using Application.Contracts.Interfaces;
using Application.Dtos.FuelStandDtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class FuelStandRepository : GenericRepository<FuelStand>, IFuelStandRepository
    {
        private readonly AppDbContext _context;
        public FuelStandRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<FuelStand> GetAllFuelStands()
        {
            return _context.FuelStands
            .Include(f => f.FuelGuns)
            .AsQueryable();
        }


        public async Task<FuelStandDto> GetFuelStandById(int id)
        {
            return await _context.FuelStands
                .Where(fs => fs.Id == id)
                .Select(fs => new FuelStandDto
                {
                    Id = fs.Id,
                    Name = fs.Name,
                })
                .FirstOrDefaultAsync();
        }
        public IQueryable<FuelStand> GetFuelStandWithDetails()
        {
            return _context.FuelStands
          .AsNoTracking()  
          .Select(s => new FuelStand
          {
              Id = s.Id,
              Name = s.Name,
              FuelGuns = s.FuelGuns.Select(g => new FuelGun
              {
                  Id = g.Id,
                  Name = g.Name,
                  Balance = g.Balance,
              }).ToList()
          });
        }
    }
}