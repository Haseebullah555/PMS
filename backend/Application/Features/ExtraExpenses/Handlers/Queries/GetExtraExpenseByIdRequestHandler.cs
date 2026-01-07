using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.ExtraExpenseDtos;
using Application.Features.sample.Requests.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.sample.Handlers.Queries
{
    public class GetExtraExpenseByIdRequestHandler : IRequestHandler<GetExtraExpenseByIdRequest, ExtraExpensesDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetExtraExpenseByIdRequestHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ExtraExpensesDto> Handle(GetExtraExpenseByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ExtraExpenses.GetByIdAsync(request.Id);
            return _mapper.Map<ExtraExpensesDto>(result);
        }
    }
}