using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Features.Supplier.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.Supplier.Handlers.Queries
{
    public class GetAllSuppliersHandler : IRequestHandler<GetAllSuppliers, List<SupplierDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllSuppliersHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<SupplierDto>> Handle(GetAllSuppliers request, CancellationToken cancellationToken)
        {
            var result = _unitOfWork.Suppliers.GetAll();
            return _mapper.Map<List<SupplierDto>>(result);
        }
    }
}