using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.StaffPaymentDtos
{
    public class StaffPaymentDto
    {
        public int Id { get; set; }
        [Display(Name = "Staff"), Required(ErrorMessage = "{0} is required")]
        public int StaffId { get; set; }
        public string? Staff { get; set; }
        [Display(Name = "Date"), Required(ErrorMessage = "{0} is required")]
        public DateOnly PaymentDate { get; set; }
        [Display(Name = "Paid Amount"), Required(ErrorMessage = "{0} is required")]
        public decimal PaidAmount { get; set; }
        [Display(Name = "Unpaid Amount"), Required(ErrorMessage = "{0} is required")]
        public decimal UnpaidAmount { get; set; }
        public string? Remarks { get; set; }
    }
}