using Application.Contracts.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StaffRepository : GenericRepository<Staff>, IStaffRepository
    {
        private readonly AppDbContext _context;
        public StaffRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

           public async Task<FuelStand?> GetFuelStandByIdAsync(int fuelStandId)
        {
            return await _context.FuelStands
                .FirstOrDefaultAsync(s => s.Id == fuelStandId);
        }

    }
}