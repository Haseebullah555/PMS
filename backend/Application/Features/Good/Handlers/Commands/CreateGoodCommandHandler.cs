using Application.Contracts.Interfaces.Common;
using Application.Features.Good.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Good.Handlers.Commands
{
    public class CreateGoodCommandHandler : IRequestHandler<CreateGoodCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateGoodCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreateGoodCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Good>(request.GoodDto);
            await _unitOfWork.Goods.Add(result);
        }
    }
}