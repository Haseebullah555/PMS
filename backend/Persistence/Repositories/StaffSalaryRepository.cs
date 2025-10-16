using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StaffSalaryRepository : GenericRepository<StaffSalary>, IStaffSalaryRepository
    {
        public StaffSalaryRepository(AppDbContext context) : base(context)
        {
        }
    }
}