using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Partner.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Partner.Handlers.Queries
{
    public class GetPartnersListRequestHandler : IRequestHandler<GetPartnersListRequest, List<PartnerDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetPartnersListRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<PartnerDto>> Handle(GetPartnersListRequest request, CancellationToken cancellationToken)
        {
            var partners = _unitOfWork.Partners.GetAllAsync();
            return _mapper.Map<List<PartnerDto>>(partners);
        }
    }
}