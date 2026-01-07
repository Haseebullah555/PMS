using Application.Dtos;
using Application.Dtos.StaffDtos;
using MediatR;

namespace Application.Features.Staff.Requests.Queries
{
    public class GetStaffsListRequest : IRequest<List<StaffDto>>
    {
        
    }
}