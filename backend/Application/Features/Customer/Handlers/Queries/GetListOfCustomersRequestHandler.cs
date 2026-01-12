using Application.Contracts.Interfaces.Common;
using Application.Dtos.CustomerDtos;
using Application.Features.Customer.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Customer.Handlers.Queries
{
    public class GetListOfCustomersRequestHandler: IRequestHandler<GetListOfCustomersRequest, List<CustomerDto>>
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
            var result = await _unitOfWork.Customers.GetAllAsync();
            return _mapper.Map<List<CustomerDto>>(result);
        }
    }
}