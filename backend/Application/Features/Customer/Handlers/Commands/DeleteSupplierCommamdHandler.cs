using Application.Contracts.Interfaces.Common;
using Application.Features.Customer.Requests.Commands;
using MediatR;

namespace Application.Features.Customer.Handlers.Commands
{
    public class DeleteSupplierCommamdHandler : IRequestHandler<DeleteSupplierCommamd>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSupplierCommamdHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task Handle(DeleteSupplierCommamd request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}