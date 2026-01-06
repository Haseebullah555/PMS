using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;
using Application.Dtos.SupplierLoanPaymentDtos;

namespace Application.Dtos.SupplierDtos
{
    public class SuppliersWithSupplierLoanPaymentsDto : CreateBaseDto
    {
        [Display(Name = "Supplier Name"), Required(ErrorMessage = "Supplier Name is required")]
        public string Name { get; set; }
        [Display(Name = "Phone Number"), Required(ErrorMessage = "Phone number is required")]
        public string PhoneNumber { get; set; }
        [Display(Name = "Address")]
        public string Address { get; set; }
        [Display(Name = "Driver Name")]
        public string DriverName { get; set; }
        [Display(Name = "Car Plate")]
        public string CarPlate { get; set; }
        public decimal Balance { get; set; }
        public List<SupplierLoanPaymentDto> SupplierLoanPayments { get; set; }

    }
}