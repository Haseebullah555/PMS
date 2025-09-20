using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetListOfSuppliersRequestHandler : IRequestHandler<GetListOfSuppliersRequest, List<SupplierDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfSuppliersRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<SupplierDto>> Handle(GetListOfSuppliersRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Suppliers.GetAll();
            return _mapper.Map<List<SupplierDto>>(result);
        }
    }
}