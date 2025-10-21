using System.Threading.Tasks;
using Application.Contracts.Interfaces;
using Application.Dtos;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class StaffPaymentRepository : GenericRepository<StaffPayment>, IStaffPaymentRepository
    {
        private readonly AppDbContext _context;
        public StaffPaymentRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<StaffPaymentDto>> GetAllStaffPaymentsAsync()
        {
            var staffPayments = await (from sp in _context.StaffPayments join s in _context.Staffs on sp.StaffId equals s.Id
                select new StaffPaymentDto
                {
                    Id = sp.Id,
                    StaffId = sp.StaffId,
                    Staff = s.FullName,
                    PaymentDate = sp.PaymentDate,
                    PaidAmount = sp.PaidAmount,
                    UnpaidAmount = sp.UnpaidAmount,
                    Remarks = sp.Remarks
                }).ToListAsync();
            return staffPayments;
        }
    }
}