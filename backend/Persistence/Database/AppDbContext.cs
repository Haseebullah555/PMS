using Domain.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        #region DbSets
            public DbSet<User> Users { get; set; }
        #endregion
    }
}
