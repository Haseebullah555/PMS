using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetCustomerByIdRequestHandler : IRequestHandler<GetCustomerByIdRequest, CustomerDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCustomerByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<CustomerDto> Handle(GetCustomerByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Customers.Get(request.Id);
            return _mapper.Map<CustomerDto>(result);
        }
    }
}