using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddExtraExpenseCommandHandler : IRequestHandler<AddExtraExpenseCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddExtraExpenseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddExtraExpenseCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                var expense = _mapper.Map<ExtraExpenses>(request.AddExtraExpenseDto);
                expense.CreatedAt = DateTime.UtcNow;

                await _unitOfWork.ExtraExpenses.AddAsync(expense);
                await _unitOfWork.SaveAsync(cancellationToken);

                var txn = new FinancialTransaction
                {
                    Date = request.AddExtraExpenseDto.ExpenseDate,
                    Type = "ExtraExpense",
                    ReferenceId = expense.Id,
                    PartyType = "Internal",
                    PartyId = 0,
                    Amount = request.AddExtraExpenseDto.Amount,
                    Direction = "OUT",
                    CreatedAt = DateTime.UtcNow
                };

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