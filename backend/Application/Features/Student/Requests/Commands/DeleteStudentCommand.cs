using Application.Dtos;
using MediatR;

namespace Application.Features.Student.Requests.Commands
{
    public class DeleteStudentCommand : IRequest
    {
        public int Id { get; set; }  // Id of the student to delete
    }
}