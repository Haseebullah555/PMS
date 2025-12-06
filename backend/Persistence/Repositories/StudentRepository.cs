using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StudentRepository : GenericRepository<Student>, IStudentRespository
    {
        private readonly AppDbContext _context;
        public StudentRepository(AppDbContext context) : base(context)
        {
            _context = context;
    }

        public IQueryable<Student> GetListOfStudents()
        {
            return _context.Students.AsQueryable();
        }
    }
}