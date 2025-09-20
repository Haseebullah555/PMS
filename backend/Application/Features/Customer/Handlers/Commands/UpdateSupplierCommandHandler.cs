using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateCustomerCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Customer>(request.CustomerDto);
            await _unitOfWork.Customers.Update(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}