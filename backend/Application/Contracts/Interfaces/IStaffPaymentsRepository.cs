using Application.Contracts.Interfaces.Common;
using Application.Dtos.StaffPaymentDtos;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface IStaffPaymentRepository : IGenericRepository<StaffPayment>
    {
         Task<List<StaffPaymentDto>> GetAllStaffPaymentsAsync();
    }
}