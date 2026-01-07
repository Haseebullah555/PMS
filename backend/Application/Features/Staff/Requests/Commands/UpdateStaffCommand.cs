using Application.Dtos.StaffDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateStaffCommand : IRequest
    {
        public UpdateStaffDto UpdateStaffDto { get; set; }
    }
}