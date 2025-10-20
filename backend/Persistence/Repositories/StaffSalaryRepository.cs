using System.Threading.Tasks;
using Application.Contracts.Interfaces;
using Application.Dtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StaffSalaryRepository : GenericRepository<StaffSalary>, IStaffSalaryRepository
    {
        private readonly AppDbContext _context;
        public StaffSalaryRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<StaffSalaryDto>> GetAllStaffSalariesAsync()
        {
            var staffSalaries = await (from ss in _context.StaffSalaries join s in _context.Staffs on ss.StaffId equals s.Id
                select new StaffSalaryDto
                {
                    Id = ss.Id,
                    StaffId = ss.StaffId,
                    Staff = ss.Staff.FullName,
                    Amount = ss.Amount,
                    Date = ss.Date
                }).ToListAsync();
            return staffSalaries;
        }
    }
}