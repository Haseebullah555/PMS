using Application.Contracts.Interfaces.Common;
using Application.Features.Currency.Requests.Queries;
using MediatR;

namespace Application.Features.Currency.Handlers.Queries
{
    public class GetAllCurrenciesRequestHandler : IRequestHandler<GetAllCurrenciesRequest, List<Domain.Models.Currency>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllCurrenciesRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<Domain.Models.Currency>> Handle(GetAllCurrenciesRequest request, CancellationToken cancellationToken)
        {
            var currencies = await _unitOfWork.Currencies.GetAllAsync();
            return currencies;
        }
    }
}