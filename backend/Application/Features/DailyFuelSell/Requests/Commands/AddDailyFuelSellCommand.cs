using Application.Dtos.DailyFuelSellDtos;
using MediatR;

namespace Application.Features.DailyFuelSell.Requests.Commands
{
    public class AddDailyFuelSellCommand : IRequest
    {
        public AddDailyFuelSellDto AddDailyFuelSellDto { get; set; }
    }
}