using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Seeders
{
    public static class FuelGunSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FuelGun>().HasData(
                new FuelGun
                {
                    Id = 1,
                    Name = "تفنگچه سرخ",
                    FuelStandId = 1,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 2,
                    Name = "تفنگچه زرد",
                    FuelStandId = 1,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 3,
                    Name = "تفنگچه سبز",
                    FuelStandId = 1,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 4,
                    Name = "تفنگچه آبی",
                    FuelStandId = 1,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 5,
                    Name = "تفنگچه سرخ",
                    FuelStandId = 2,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 6,
                    Name = "تفنگچه زرد",
                    FuelStandId = 2,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 7,
                    Name = "تفنگچه سبز",
                    FuelStandId = 2,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 8,
                    Name = "تفنگچه آبی",
                    FuelStandId = 2,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 9,
                    Name = "تفنگچه سرخ",
                    FuelStandId = 3,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 10,
                    Name = "تفنگچه زرد",
                    FuelStandId = 3,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 11,
                    Name = "تفنگچه سبز",
                    FuelStandId = 3,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 12,
                    Name = "تفنگچه آبی",
                    FuelStandId = 3,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 13,
                    Name = "تفنگچه سرخ",
                    FuelStandId = 4,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 14,
                    Name = "تفنگچه زرد",
                    FuelStandId = 4,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 15,
                    Name = "تفنگچه سبز",
                    FuelStandId = 4,
                    Balance = 0
                },
                new FuelGun
                {
                    Id = 16,
                    Name = "تفنگچه آبی",
                    FuelStandId = 4,
                    Balance = 0
                }
            );
        }
    }
}
