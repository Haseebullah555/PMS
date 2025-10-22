using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateStaffPaymentCommand : IRequest
    {
        public StaffPaymentDto StaffPaymentDto { get; set; }
    }
}