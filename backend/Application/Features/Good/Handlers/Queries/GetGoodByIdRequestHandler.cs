using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Good.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Good.Handlers.Queries
{
    public class GetGoodByIdRequestHandler : IRequestHandler<GetGoodByIdRequest, GoodDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetGoodByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<GoodDto> Handle(GetGoodByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Goods.Get(request.Id);
            return _mapper.Map<GoodDto>(result);
        }
    }
}