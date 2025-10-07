using Application.Dtos;
using MediatR;

namespace Application.Features.Good.Requests.Commands
{
    public class UpdateGoodCommand : IRequest
    {
        public GoodDto GoodDto { get; set; }
    }
}