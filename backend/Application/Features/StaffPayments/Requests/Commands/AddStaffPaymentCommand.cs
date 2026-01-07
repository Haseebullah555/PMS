using Application.Dtos.StaffPaymentDtos;
using MediatR;

namespace Application.Features.StaffPayments.Requests.Commands
{
    public class AddStaffPaymentCommand : IRequest
    {
        public StaffPaymentDto StaffPaymentDto { get; set; }
    }
}