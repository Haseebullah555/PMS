using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateStaffCommand : IRequest
    {
        public StaffDto StaffDto { get; set; }
    }
}