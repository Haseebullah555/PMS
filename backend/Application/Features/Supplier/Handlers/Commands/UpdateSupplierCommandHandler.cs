using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
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
            var result = _mapper.Map<Domain.Models.Supplier>(request.SupplierDto);
            _unitOfWork.Suppliers.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}