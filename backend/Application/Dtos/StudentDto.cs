using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class StudentDto : BaseDto
    {
        [Display(Name = "Student Name"), Required(ErrorMessage = "Student Name is required")]
        public string Name { get; set; }

        [Display(Name = "Father Name"), Required(ErrorMessage = "Father Name is required")]
        public string FatherName { get; set; }

    }
}