namespace Application.Dtos.UserManagement.User
{
    public class AssignRolesToUserDto
    {
        public int UserId { get; set; }        
        public List<Guid> RoleIds { get; set; } = new();
    }
}