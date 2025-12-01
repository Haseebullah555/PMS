using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class UpdatePurchaseCommandHandler : IRequestHandler<UpdatePurchaseCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdatePurchaseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdatePurchaseCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Purchase>(request.PurchaseDto);
            _unitOfWork.Purchases.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}