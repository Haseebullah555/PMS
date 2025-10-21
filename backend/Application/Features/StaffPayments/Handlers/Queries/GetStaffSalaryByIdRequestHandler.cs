using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetStaffSalaryByIdRequestHandler : IRequestHandler<GetStaffSalaryByIdRequest, StaffSalaryDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetStaffSalaryByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<StaffSalaryDto> Handle(GetStaffSalaryByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.StaffSalaries.Get(request.Id);
            return _mapper.Map<StaffSalaryDto>(result);
        }
    }
}