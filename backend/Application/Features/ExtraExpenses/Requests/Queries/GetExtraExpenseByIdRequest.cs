using Application.Dtos;
using MediatR;

namespace Application.Features.sample.Requests.Queries
{
    public class GetExtraExpenseByIdRequest : IRequest<ExtraExpensesDto>
    {
        public int Id { get; set; }
    }
}