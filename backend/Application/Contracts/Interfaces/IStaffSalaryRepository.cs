using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IStaffSalaryRepository : IGenericRepository<StaffSalary>
    {
         Task<List<StaffSalaryDto>> GetAllStaffSalariesAsync();
    }
}