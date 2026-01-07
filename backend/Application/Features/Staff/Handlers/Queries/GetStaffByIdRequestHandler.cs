using Application.Contracts.Interfaces.Common;
using Application.Dtos.StaffDtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetStaffByIdRequestHandler : IRequestHandler<GetStaffByIdRequest, StaffDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetStaffByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<StaffDto> Handle(GetStaffByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Staffs.GetByIdAsync(request.Id);
            return _mapper.Map<StaffDto>(result);
        }
    }
}