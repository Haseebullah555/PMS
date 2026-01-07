using Application.Dtos;
using Application.Dtos.FuelDistributionDtos;
using MediatR;

namespace Application.Features.DailyFuelSell.Requests.Commands
{
    public class UpdateDailyFuelSellCommand : IRequest
    {
        public UpdateDailyFuelSellDto UpdateDailyFuelSellDto { get; set; }
    }
}