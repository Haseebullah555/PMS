using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddCustomerCommandHandler : IRequestHandler<AddCustomerCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddCustomerCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddCustomerCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Customer>(request.CustomerDto);
            await _unitOfWork.Customers.Add(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}