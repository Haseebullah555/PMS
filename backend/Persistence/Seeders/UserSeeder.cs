using Domain.UserManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class UserSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(GenerateUsers());
    }
    private static IEnumerable<User> GenerateUsers()
    {
        // var hasher = new PasswordHasher<User>();
        // var hash = hasher.HashPassword(null, "Admin@123");
        // Console.WriteLine(hash);

        return new List<User>
        {
            new User
            {
                Id = Guid.Parse("b2f8e888-dfc9-4c4a-9b76-d7f0a83f5101"),
                UserName = "admin",
                Email = "admin@gmail.com",
                PasswordHash = "AQAAAAIAAYagAAAAEESismBFxxCDGsZhVMezK/U2BT+dyV4mI+ivulmwALP//fbwRF+yKRyJs1H6xzMf1w==", // Admin@123
                Role = "Admin",
                RefreshToken = "b0ab4d0e-6be8-4fb2-81a0-0e5ec1a9a8f3",
                RefreshTokenExpiryTime = DateTime.SpecifyKind(new DateTime(2030, 1, 1), DateTimeKind.Utc)

            }
        };
    }
}