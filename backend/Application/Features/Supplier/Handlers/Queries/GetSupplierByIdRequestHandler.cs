using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using AutoMapper.Configuration.Annotations;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetSupplierByIdRequestHandler : IRequestHandler<GetSupplierByIdRequest, SupplierDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetSupplierByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<SupplierDto> Handle(GetSupplierByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Suppliers.Get(request.Id);
            return _mapper.Map<SupplierDto>(result);
        }
    }
}