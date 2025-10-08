using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class AddExtraExpenseCommand : IRequest
    {
        public ExtraExpensesDto ExtraExpensesDto { get; set; }
    }
}