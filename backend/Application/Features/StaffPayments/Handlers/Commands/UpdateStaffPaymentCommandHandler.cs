using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.StaffPayments.Handlers.Commands
{
    public class UpdateStaffPaymentCommandHandler : IRequestHandler<UpdateStaffPaymentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateStaffPaymentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateStaffPaymentCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.StaffPayment>(request.StaffPaymentDto);
            _unitOfWork.StaffPayments.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}