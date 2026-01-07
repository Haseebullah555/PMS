using Application.Dtos.StaffDtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetStaffByIdRequest : IRequest<StaffDto>
    {
        public int Id { get; set; }
    }
}