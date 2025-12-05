using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StudentRepository : GenericRepository<Student>, IStudentRespository
    {
        public StudentRepository(AppDbContext context) : base(context)
        {
        }
    }
}