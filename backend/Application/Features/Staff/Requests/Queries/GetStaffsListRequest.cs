using Application.Dtos;
using MediatR;

namespace Application.Features.Staff.Requests.Queries
{
    public class GetStaffsListRequest : IRequest<List<StaffDto>>
    {
        
    }
}