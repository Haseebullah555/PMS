using Application.Contracts.Interfaces.Common;
using Application.Features.Good.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Good.Handlers.Commands
{
    public class UpdateGoodCommandHandler : IRequestHandler<UpdateGoodCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UpdateGoodCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateGoodCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Good>(request.GoodDto);
            await _unitOfWork.Goods.Update(result);
        }
    }
}