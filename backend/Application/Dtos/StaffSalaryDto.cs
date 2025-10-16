using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class StaffSalaryDto : BaseDto
    {
        [Display(Name ="Staff"),Required(ErrorMessage = "{0} is required")]
        public int StaffId { get; set; }
        public string? Staff { get; set; }
        [Display(Name ="Amount"),Required(ErrorMessage = "{0} is required")]
        public decimal Amount { get; set; }
        [Display(Name ="Date"),Required(ErrorMessage = "{0} is required")]
        public DateOnly Date { get; set; }
    }
}