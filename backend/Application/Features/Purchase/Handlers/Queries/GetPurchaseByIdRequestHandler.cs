using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Purchase.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Purchase.Handlers.Queries
{
    public class GetPurchaseByIdRequestHandler : IRequestHandler<GetPurchaseByIdRequest, PurchaseDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetPurchaseByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PurchaseDto> Handle(GetPurchaseByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Purchases.Get(request.PurchaseId);
            return _mapper.Map<PurchaseDto>(result);
        }
    }
}