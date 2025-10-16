using Application.Contracts.Interfaces.Common;
using Application.Features.PartnerTransaction.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.PartnerTransaction.Handlers.Commands
{
    public class CreatePartnerTransactionCommandHandler : IRequestHandler<CreatePartnerTransactionCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreatePartnerTransactionCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreatePartnerTransactionCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.PartnerTransaction>(request.PartnerTransactionDto);
            await _unitOfWork.PartnerTransactions.Add(result);
        }
    }
}