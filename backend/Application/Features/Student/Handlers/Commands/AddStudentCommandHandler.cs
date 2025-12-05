using Application.Contracts.Interfaces.Common;
using Application.Features.Student.Requests.Commands;
using AutoMapper;
using Domain.Models;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Student.Handlers.Commands
{
    public class AddStudentCommandHandler : IRequestHandler<AddStudentCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddStudentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task Handle(AddStudentCommand request, CancellationToken cancellationToken)
        {
            var addStudentRecord = _mapper.Map<Domain.Models.Student>(request.StudentDto);
            // Save to DB
            await _unitOfWork.Students.AddAsync(addStudentRecord);
            await _unitOfWork.SaveAsync(cancellationToken);

        }

        // public async Task Handle(AddStudentCommand request, CancellationToken cancellationToken)
        // {
        //     // Map the request to Student entity
        //     var student = _mapper.Map<Student>(request);

        //     // Add the student to repository
        //     await _unitOfWork.StudentRepository.AddAsync(student);

        //     // Save changes
        //     await _unitOfWork.SaveAsync();
        // }
    }
}
