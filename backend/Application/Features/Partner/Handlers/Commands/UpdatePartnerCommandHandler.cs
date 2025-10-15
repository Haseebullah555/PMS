using Application.Contracts.Interfaces.Common;
using Application.Features.Partner.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Partner.Handlers.Commands
{
    public class UpdatePartnerCommandHandler : IRequestHandler<UpdatePartnerCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdatePartnerCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdatePartnerCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Partner>(request.PartnerDto);
            await _unitOfWork.Partners.Update(result);
        }
    }
}