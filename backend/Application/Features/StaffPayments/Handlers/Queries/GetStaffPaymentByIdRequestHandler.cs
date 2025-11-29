using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.StaffPayments.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.StaffPayments.Handlers.Queries
{
    public class GetStaffPaymentByIdRequestHandler : IRequestHandler<GetStaffPaymentByIdRequest, StaffPaymentDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetStaffPaymentByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<StaffPaymentDto> Handle(GetStaffPaymentByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.StaffPayments.GetByIdAsync(request.Id);
            return _mapper.Map<StaffPaymentDto>(result);
        }
    }
}