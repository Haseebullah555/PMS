using MediatR;

namespace Application.Features.Currency.Requests.Queries
{
    public class GetAllCurrenciesRequest : IRequest<List<Domain.Models.Currency>>
    {
        
    }
}