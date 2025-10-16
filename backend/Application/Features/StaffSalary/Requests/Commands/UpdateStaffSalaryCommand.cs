using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateStaffSalaryCommand : IRequest
    {
        public StaffSalaryDto StaffSalaryDto { get; set; }
    }
}