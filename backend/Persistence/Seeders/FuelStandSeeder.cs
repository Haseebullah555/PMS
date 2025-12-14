using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Seeders
{
    public static class FuelStandSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FuelStand>().HasData(
                new FuelStand
                {
                    Id = 1,
                    Name = "پایه اول",
                    StaffId = 1,
                },
                new FuelStand
                {
                    Id = 2,
                    Name = "پایه دوم",
                    StaffId = 1,
                },
                new FuelStand
                {
                    Id = 3,
                    Name = "پایه سوم",
                    StaffId = 2,
                },
                new FuelStand
                {
                    Id = 4,
                    Name = "پایه چهارم",
                    StaffId = 2,
                }

            );
        }
    }
}
