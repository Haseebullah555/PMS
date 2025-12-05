using API.Controllers.Common;
using Application.Dtos;
using Application.Features.Purchase.Requests.Commands;
using Application.Features.Purchase.Requests.Queries;
using Application.Features.sample.Requests.Commands;
using Application.Features.Student.Requests.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : BaseApiController
    {
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
    }
}