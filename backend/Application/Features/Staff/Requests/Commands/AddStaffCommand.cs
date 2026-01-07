using Application.Dtos.StaffDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddStaffCommand : IRequest
    {
        public AddStaffDto AddStaffDto { get; set; }
    }
}