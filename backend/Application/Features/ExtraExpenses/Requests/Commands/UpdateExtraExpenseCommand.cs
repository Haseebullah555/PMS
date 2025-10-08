using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateExtraExpenseCommand : IRequest
    {
        public ExtraExpensesDto ExtraExpensesDto { get; set; }
    }
}