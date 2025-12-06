using Application.Contracts.Interfaces.Common;
using Application.Features.Student.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Student.Handlers.Commands
{
    public class DeleteStudentCommandHandler : IRequestHandler<DeleteStudentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DeleteStudentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(DeleteStudentCommand request, CancellationToken cancellationToken)
        {
            var student = await _unitOfWork.Students.GetByIdAsync(request.Id);
            // Save to DB
                   _unitOfWork.Students.Delete(student); // Remove is usually void
            await _unitOfWork.SaveAsync(cancellationToken);
        }
    }
}
