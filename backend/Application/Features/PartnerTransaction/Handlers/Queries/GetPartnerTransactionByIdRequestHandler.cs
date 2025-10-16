using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.PartnerTransaction.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.PartnerTransaction.Handlers.Queries
{
    public class GetPartnerTransactionByIdRequestHandler : IRequestHandler<GetPartnerTransactionByIdRequest, PartnerTransactionDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetPartnerTransactionByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PartnerTransactionDto> Handle(GetPartnerTransactionByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.PartnerTransactions.Get(request.Id);
            return _mapper.Map<PartnerTransactionDto>(result);
        }
    }
}