using Domain.Common;

namespace Domain.UserManagement
{
    public class RolePermission: BaseDomainEntity
    {
        public Guid RoleId { get; set; }
        public Role Role { get; set; }

        public Guid PermissionId { get; set; }
        public Permission Permission { get; set; }
    }
}