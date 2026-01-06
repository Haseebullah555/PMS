using Application.Contracts.Interfaces.Common;
using Application.Features.DailyFuelSell.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.DailyFuelSell.Handlers.Commands
{
    public class UpdateDailyFuelSellCommandHandler : IRequestHandler<UpdateDailyFuelSellCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateDailyFuelSellCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public Task Handle(UpdateDailyFuelSellCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

    }
}