using Application.Contracts.Interfaces.Common;
using Application.Features.Supplier.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Supplier.Handlers.Commands
{
    public class UpdateSupplierCommandHandler : IRequestHandler<UpdateSupplierCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateSupplierCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateSupplierCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Supplier>(request.UpdateSupplierDto);
            _unitOfWork.Suppliers.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}