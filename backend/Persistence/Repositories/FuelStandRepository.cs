using Application.Contracts.Interfaces;
using Application.Dtos;
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

        public IQueryable<FuelStandDto> GetAllFuelStands()
        {
            return _context.FuelStands
                .Select(fs => new FuelStandDto
                {
                    Id = fs.Id,
                    Name = fs.Name,
                    StaffId = fs.StaffId,
                    Staff = fs.Staff.FullName
                });
        }

        public async Task<FuelStandDto> GetFuelStandById(int id)
        {
            return await _context.FuelStands
                .Where(fs => fs.Id == id)
                .Select(fs => new FuelStandDto
                {
                    Id = fs.Id,
                    Name = fs.Name,
                    StaffId = fs.StaffId,
                    Staff = fs.Staff.FullName
                })
                .FirstOrDefaultAsync();
        }
    }
}