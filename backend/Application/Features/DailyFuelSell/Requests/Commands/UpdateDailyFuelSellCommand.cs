using Application.Dtos;
using MediatR;

namespace Application.Features.DailyFuelSell.Requests.Commands
{
    public class UpdateDailyFuelSellCommand : IRequest
    {
        public DailyFuelSellDto DailyFuelSellDto { get; set; }
    }
}