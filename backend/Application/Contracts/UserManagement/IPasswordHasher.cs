using Microsoft.AspNetCore.Identity;
namespace Application.Contracts.UserManagement
{
    public interface IPasswordHasher<TUser>
    {
        string HashPassword(TUser user, string password);
        PasswordVerificationResult VerifyHashedPassword(
            TUser user,
            string hashedPassword,
            string providedPassword);
    }

}