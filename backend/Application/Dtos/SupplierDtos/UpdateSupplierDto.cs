using System.ComponentModel.DataAnnotations;
using Application.Dtos.Common;

namespace Application.Dtos.SupplierDtos
{
    public class UpdateSupplierDto : UpdateBaseDto
    {
        public int Id { get; set; }
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

        [Display(Name = "Balance")]
        public decimal Balance { get; set; }
    }
}