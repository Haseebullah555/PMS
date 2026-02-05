using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Seeders
{
    public class CurrencySeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Currency>().HasData(
                new Currency
                {
                    Id = 1,
                    Name = "افغانی",
                },
                new Currency
                {
                    Id = 2,
                    Name = "دالر",
                },
                new Currency
                {
                    Id = 3,
                    Name = "یورو",
                },
                new Currency
                {
                    Id = 4,
                    Name = "درهم",
                },
                new Currency
                {
                    Id = 5,
                    Name = "ریال",
                },
                new Currency
                {
                    Id = 6,
                    Name = "کلدار",
                }
            );
        }
    }
}