using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Seeders
{
    public static class StaffSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Staff>().HasData(
                new Staff
                {
                    Id = 1,
                    FullName = "Ahmad Khan",
                    Position = "Manager",
                    Phone = "0700000001",
                    Salary = 50000,
                    Balance = 0,
                    HireDate = new DateOnly(2022, 1, 10),
                    Status = true
                },
                new Staff
                {
                    Id = 2,
                    FullName = "Rahman",
                    Position = "Accountant",
                    Phone = "0700000002",
                    Salary = 35000,
                    Balance = 0,
                    HireDate = new DateOnly(2023, 5, 1),
                    Status = true
                }
            );
        }
    }
}
