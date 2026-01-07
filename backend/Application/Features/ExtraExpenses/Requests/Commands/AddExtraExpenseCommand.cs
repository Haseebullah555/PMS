using Application.Dtos.ExtraExpenseDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddExtraExpenseCommand : IRequest
    {
        public AddExtraExpenseDto AddExtraExpenseDto { get; set; }
    }
}