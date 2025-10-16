using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddStaffCommand : IRequest
    {
        public StaffDto StaffDto { get; set; }
    }
}