using Domain.Common;

namespace Domain.UserManagement
{
    public class Role : BaseDomainEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty; // Admin, Manager
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}