using Application.Contracts.Interfaces.Common;
using Application.Dtos;
using Application.Dtos.Common;
using Application.Features.Student.Requests.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Student.Handlers.Queries
{
    public class GetListOfStudentCommandHandler : IRequestHandler<GetListOfStudentCommand, PaginatedResult<StudentDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetListOfStudentCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<PaginatedResult<StudentDto>> Handle(GetListOfStudentCommand request, CancellationToken cancellationToken)
        {
            // 1️⃣ Get queryable
            var query = _unitOfWork.Students.GetListOfStudents(); // IQueryable<Student>

            // 2️⃣ Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(s => s.Name.Contains(request.Search)); // Assuming Student has Name
            }

            // 3️⃣ Sorting
            if (!string.IsNullOrWhiteSpace(request.SortField))
            {
                if (request.SortField.Equals("name", StringComparison.OrdinalIgnoreCase))
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Name)
                        : query.OrderBy(s => s.Name);
                else if (request.SortField.Equals("id", StringComparison.OrdinalIgnoreCase))
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(s => s.Id)
                        : query.OrderBy(s => s.Id);
            }
            else
            {
                query = query.OrderBy(s => s.Id); // default sort
            }

            // 4️⃣ Total count before pagination
            var total = await query.CountAsync(cancellationToken);

            // 5️⃣ Pagination
            var students = await query
                .Skip((request.Page - 1) * request.PerPage)
                .Take(request.PerPage)
                .ToListAsync(cancellationToken);

            // 6️⃣ Map to DTO
            var studentDtos = _mapper.Map<List<StudentDto>>(students);

            // 7️⃣ Return paginated result
            return new PaginatedResult<StudentDto>
            {
                Data = studentDtos,
                Total = total,
                CurrentPage = request.Page,
                PerPage = request.PerPage
            };
        }

    }
}