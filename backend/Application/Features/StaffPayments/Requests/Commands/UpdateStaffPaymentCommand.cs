using Application.Dtos;
using Application.Dtos.StaffPaymentDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateStaffPaymentCommand : IRequest
    {
        public StaffPaymentDto StaffPaymentDto { get; set; }
    }
}