using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetStaffSalaryByIdRequest : IRequest<StaffSalaryDto>
    {
        public int Id { get; set; }
    }
}