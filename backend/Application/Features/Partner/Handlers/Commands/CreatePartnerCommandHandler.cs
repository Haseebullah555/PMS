using Application.Contracts.Interfaces.Common;
using Application.Features.Partner.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Partner.Handlers.Commands
{
    public class CreatePartnerCommandHandler : IRequestHandler<CreatePartnerCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreatePartnerCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(CreatePartnerCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Partner>(request.PartnerDto);
            await _unitOfWork.Partners.Add(result);
        }
    }
}