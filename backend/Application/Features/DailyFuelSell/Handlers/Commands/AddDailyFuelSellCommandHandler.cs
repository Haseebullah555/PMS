using Application.Contracts.Interfaces.Common;
using Application.Features.DailyFuelSell.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.DailyFuelSell.Handlers.Commands
{
    public class AddDailyFuelSellCommandHandler : IRequestHandler<AddDailyFuelSellCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddDailyFuelSellCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(AddDailyFuelSellCommand request, CancellationToken cancellationToken)
        {
            await using var tx = await _unitOfWork.BeginTransactionAsync();

            try
            {
                // =====================================================
                // Create daily fuel sell
                //======================================================

                var entity = _mapper.Map<Domain.Models.DailyFuelSell>(request.AddDailyFuelSellDto);
                await _unitOfWork.DailyFuelSells.AddAsync(entity);
                await _unitOfWork.SaveAsync(cancellationToken); // REQUIRED to get ID

                // =====================================================
                // Update stock
                //======================================================

                var stock = await _unitOfWork.Stocks.GetByFuelTypeIdAsync(request.AddDailyFuelSellDto.FuelTypeId);

                if (stock == null)
                    throw new InvalidOperationException("Stock record not found.");

                if (stock.QuantityInLiter < request.AddDailyFuelSellDto.SoldFuelAmount)
                    throw new InvalidOperationException("Insufficient stock.");

                stock.QuantityInLiter -= request.AddDailyFuelSellDto.SoldFuelAmount;
                _unitOfWork.Stocks.Update(stock);

                // =====================================================
                // Record revenue transaction
                //======================================================

                var revenueTxn = new FinancialTransaction
                {
                    Date = request.AddDailyFuelSellDto.Date,
                    Type = "DailyFuelSale",
                    ReferenceId = entity.Id,
                    PartyType = "Internal",
                    PartyId = 0,
                    Amount = request.AddDailyFuelSellDto.TotalPrice,
                    Direction = "IN",
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.FinancialTransactions.AddAsync(revenueTxn);

                // =====================================================
                // Record COGS transaction (IMPORTANT)
                //======================================================

                decimal cost = (decimal)(request.AddDailyFuelSellDto.SoldFuelAmount * stock.UnitPrice);

                var cogsTxn = new FinancialTransaction
                {
                    Date = request.AddDailyFuelSellDto.Date,
                    Type = "COGS",
                    ReferenceId = entity.Id,
                    PartyType = "Internal",
                    PartyId = 0,
                    Amount = cost,
                    Direction = "OUT",
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.FinancialTransactions.AddAsync(cogsTxn);

                // =====================================================
                // Save & commit
                //======================================================

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