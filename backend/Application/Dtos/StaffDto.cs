using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Application.Dtos.FuelDistribution;

namespace Application.Dtos
{
    public class StaffDto : CreateBaseDto
    {
        [Display(Name = "Name"), Required(ErrorMessage = "{0} is required")]
        public string FullName { get; set; }
        [Display(Name = "Position"), Required(ErrorMessage = "{0} is required")]
        public string Position { get; set; }
        [Display(Name = "Phone")]
        public string Phone { get; set; }
        [Display(Name = "Salary"), Required(ErrorMessage = "{0} is required")]
        public double Salary { get; set; }
        [Display(Name = "Hire Date"), Required(ErrorMessage = "{0} is required")]
        public DateOnly HireDate { get; set; }
        public bool Status { get; set; }
        public FuelStandDto? FuelStand { get; set; }

    }
}