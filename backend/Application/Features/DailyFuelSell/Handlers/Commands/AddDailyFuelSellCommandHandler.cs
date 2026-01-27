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
                // 1️⃣ Create daily fuel sell record
                //======================================================

                var entity = _mapper.Map<Domain.Models.DailyFuelSell>(request.AddDailyFuelSellDto);
                await _unitOfWork.DailyFuelSells.AddAsync(entity);
                await _unitOfWork.SaveAsync(cancellationToken); // required for entity.Id

                // =====================================================
                // 2️⃣ Update stock (inventory movement)
                //======================================================

                var stock = await _unitOfWork.Stocks
                    .GetByFuelTypeIdAsync(request.AddDailyFuelSellDto.FuelTypeId);

                if (stock == null)
                    throw new InvalidOperationException("Stock record not found.");

                if (stock.QuantityInLiter < request.AddDailyFuelSellDto.SoldFuelAmount)
                    throw new InvalidOperationException("Insufficient stock.");

                stock.QuantityInLiter -= request.AddDailyFuelSellDto.SoldFuelAmount;
                _unitOfWork.Stocks.Update(stock);

                // =====================================================
                // 3️⃣ Record CASH inflow (POS sale)
                //======================================================

                if (request.AddDailyFuelSellDto.CollectedMoney > 0)
                {
                    var cashTxn = new FinancialTransaction
                    {
                        Date = request.AddDailyFuelSellDto.Date,
                        Type = "DailyFuelSale",
                        ReferenceId = entity.Id,
                        PartyType = "POS",      // ✅ virtual sales source
                        PartyId = 0,
                        Amount = request.AddDailyFuelSellDto.CollectedMoney,
                        Direction = "IN",
                        CreatedAt = DateTime.UtcNow
                    };

                    await _unitOfWork.FinancialTransactions.AddAsync(cashTxn);
                }

                // =====================================================
                // 4️⃣ Save & commit
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