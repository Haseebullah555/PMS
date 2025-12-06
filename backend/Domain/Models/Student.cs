
using Domain.Common;

namespace Domain.Models
{
    public class Student : BaseDomainEntity
    {
        public string Name { get; set; }
        public string FatherName { get; set; }= string.Empty;
    }
}