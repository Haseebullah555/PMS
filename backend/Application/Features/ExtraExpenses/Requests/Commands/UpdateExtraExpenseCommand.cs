using Application.Dtos.ExtraExpenseDtos;
using MediatR;

namespace Application.Features.sample.Requests.Commands
{
    public class UpdateExtraExpenseCommand : IRequest
    {
        public UpdateExtraExpenseDto UpdateExtraExpenseDto { get; set; }
    }
}