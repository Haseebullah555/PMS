using Application.Contracts.Interfaces.Common;
using Application.Features.FuelStand.Requests.Commands;
using Application.Features.Student.Requests.Commands;
using AutoMapper;
using MediatR;

namespace Application.Features.Student.Handlers.Commands
{
    public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateStudentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
        {
            var result = _mapper.Map<Domain.Models.Student>(request.StudentDto);
            _unitOfWork.Students.Update(result);
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}