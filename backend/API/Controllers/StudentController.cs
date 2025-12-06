using API.Controllers.Common;
using Application.Dtos;
using Application.Features.Purchase.Requests.Commands;
using Application.Features.Purchase.Requests.Queries;
using Application.Features.sample.Requests.Commands;
using Application.Features.Student.Requests.Commands;
using Application.Features.Student.Requests.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : BaseApiController
    {

          [HttpGet("list")]
        public async Task<ActionResult> GetAllStudents([FromQuery] string? search, [FromQuery] string? sort_field, [FromQuery] string? sort_order, [FromQuery] int page = 1, [FromQuery] int per_page = 10)
        {
            var result = await _mediator.Send(new GetListOfStudentCommand
            {
                Search = search,
                SortField = sort_field,
                SortOrder = sort_order,
                Page = page,
                PerPage = per_page
            });

            return Ok(new
            {
                data = result.Data,
                meta = new
                {
                    total = result.Total,
                    current_page = result.CurrentPage,
                    per_page = result.PerPage,
                    last_page = (int)Math.Ceiling((double)result.Total / result.PerPage),
                    from = ((result.CurrentPage - 1) * result.PerPage) + 1,
                    to = Math.Min(result.CurrentPage * result.PerPage, result.Total)
                }
            });
        }

        [HttpPost("create")]
         public async Task<ActionResult> Create(StudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                await _mediator.Send(new AddStudentCommand{StudentDto = studentDto});
                return Ok(new { message = "خرید با موفقیت ثبت شد"});
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در ثبت خرید", error = ex.Message });
            }
        }

        
        [HttpPost("update")]
        public async Task<ActionResult> Update(StudentDto studentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                await _mediator.Send(new UpdateStudentCommand { StudentDto = studentDto });
                return Ok(new { message = "شاګرد با موفقیت اپدید شد" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در به‌روزرسانی دانشجو", error = ex.Message });
            }
        }

        [HttpGet("delete")]

        public async Task<ActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "ورودی نادرست است", errors = ModelState });

            try
            {
                await _mediator.Send(new DeleteStudentCommand { Id = id });
                return Ok(new { message = "شاګرد با موفقیت حذف شد" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "خطا در حذف دانشجو", error = ex.Message });
            }
        }
    
    }
}