using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StaffRepository : GenericRepository<Staff>, IStaffRepository
    {
        public StaffRepository(AppDbContext context) : base(context)
        {
        }
    }
}