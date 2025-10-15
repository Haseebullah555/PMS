using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Partner.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Partner.Handlers.Queries
{
    public class GetPartnerByIdRequestHandler : IRequestHandler<GetPartnerByIdRequest, PartnerDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetPartnerByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PartnerDto> Handle(GetPartnerByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Partners.Get(request.Id);
            return _mapper.Map<PartnerDto>(result);
        }
    }
}