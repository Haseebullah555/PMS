using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddStaffSalaryCommand : IRequest
    {
        public StaffSalaryDto StaffSalaryDto { get; set; }
    }
}