using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Staff.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Staff.Handlers.Queries
{
    public class GetStaffsListRequestHandler : IRequestHandler<GetStaffsListRequest, List<StaffDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetStaffsListRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<StaffDto>> Handle(GetStaffsListRequest request, CancellationToken cancellationToken)
        {
            var staffs = await _unitOfWork.Staffs.GetAllAsync();
            return _mapper.Map<List<StaffDto>>(staffs);
        }
    }
}