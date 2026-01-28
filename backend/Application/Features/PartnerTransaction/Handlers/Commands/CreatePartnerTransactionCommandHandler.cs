using Application.Contracts.Interfaces.Common;
using Application.Features.PartnerTransaction.Requests.Commands;
using AutoMapper;
using Domain.Models;
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
            await using var tx = await _unitOfWork.BeginTransactionAsync();
            try
            {
                var result = _mapper.Map<Domain.Models.PartnerTransaction>(request.PartnerTransactionDto);
                await _unitOfWork.PartnerTransactions.AddAsync(result);
                await _unitOfWork.SaveAsync(cancellationToken);
                var txn = new FinancialTransaction
                {
                    Date = request.PartnerTransactionDto.Date,
                    Type = "PartnerTransaction",
                    ReferenceId = result.Id,
                    PartyType = "Partner",
                    PartyId = result.PartnerId,
                    Amount = request.PartnerTransactionDto.Amount,
                    CreatedAt = DateTime.UtcNow
                };
                if (result.Type == Domain.Enums.TransactionType.Deposit)
                {
                    txn.Direction = "IN";
                }
                else if (result.Type == Domain.Enums.TransactionType.Withdrawal)
                {
                    txn.Direction = "OUT";
                }

                await _unitOfWork.FinancialTransactions.AddAsync(txn);
                await _unitOfWork.SaveAsync(cancellationToken);

                await tx.CommitAsync(cancellationToken);
            }
            catch
            {
                await tx.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}