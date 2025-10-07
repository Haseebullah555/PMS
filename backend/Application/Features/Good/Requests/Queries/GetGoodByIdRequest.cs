using System.Text.RegularExpressions;
using Application.Dtos;
using MediatR;

namespace Application.Features.Good.Requests.Queries
{
    public class GetGoodByIdRequest : IRequest<GoodDto>
    {
        public int Id { get; set; }
    }
}