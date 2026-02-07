using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.UserManagement
{
    public class Role
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty; // Admin, Manager
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}