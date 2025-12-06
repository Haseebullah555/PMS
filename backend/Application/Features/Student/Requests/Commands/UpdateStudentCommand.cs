using Application.Dtos;
using MediatR;

namespace Application.Features.Student.Requests.Commands
{
    public class UpdateStudentCommand : IRequest
    {
        public StudentDto StudentDto { get; set; }
    }
}