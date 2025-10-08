using Application.Contracts.Interfaces.Common;
using Application.Features.sample.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;

namespace Application.Features.sample.Handlers.Commands
{
    public class AddExtraExpenseCommandHandler : IRequestHandler<AddExtraExpenseCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddExtraExpenseCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(AddExtraExpenseCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<ExtraExpenses>(request.ExtraExpensesDto);
            await _unitOfWork.ExtraExpenses.Add(result);
            await _unitOfWork.SaveChanges(cancellationToken);
        }
    }
}