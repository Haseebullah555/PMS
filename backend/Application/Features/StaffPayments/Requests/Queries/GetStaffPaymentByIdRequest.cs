using Application.Dtos.StaffPaymentDtos;
using MediatR;

namespace Application.Features.StaffPayments.Requests.Queries
{
    public class GetStaffPaymentByIdRequest : IRequest<StaffPaymentDto>
    {
        public int Id { get; set; }
    }
}