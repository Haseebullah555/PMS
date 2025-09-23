using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetListOfCustomersRequestHandler : IRequestHandler<GetListOfCustomersRequest, List<CustomerDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfCustomersRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<CustomerDto>> Handle(GetListOfCustomersRequest request, CancellationToken cancellationToken)
        {
            var result = _unitOfWork.Customers.GetAll();
            return _mapper.Map<List<CustomerDto>>(result);
        }
    }
}