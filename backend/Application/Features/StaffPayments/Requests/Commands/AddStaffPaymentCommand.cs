using Application.Dtos;
using MediatR;

namespace Application.Features.StaffPayments.Requests.Commands
{
    public class AddStaffPaymentCommand : IRequest
    {
        public StaffPaymentDto StaffPaymentDto { get; set; }
    }
}