using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddSupplierCommandHandler : IRequestHandler<AddSupplierCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddSupplierCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddSupplierCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Supplier>(request.SupplierDto);
            await _unitOfWork.Suppliers.AddAsync(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}