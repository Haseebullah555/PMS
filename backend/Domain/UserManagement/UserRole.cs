using Domain.Common;

namespace Domain.UserManagement
{
    public class UserRole : BaseDomainEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid RoleId { get; set; }
        public Role Role { get; set; }
    }
}