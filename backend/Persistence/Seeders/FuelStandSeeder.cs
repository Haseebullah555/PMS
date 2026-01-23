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
                },
                new FuelStand
                {
                    Id = 2,
                    Name = "پایه دوم",
                },
                new FuelStand
                {
                    Id = 3,
                    Name = "پایه سوم",
                },
                new FuelStand
                {
                    Id = 4,
                    Name = "پایه چهارم",
                }

            );
        }
    }
}
