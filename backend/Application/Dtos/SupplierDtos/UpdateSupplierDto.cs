using Application.Dtos.Common;

namespace Application.Dtos.SupplierDtos
{
    public class UpdateSupplierDto : UpdateBaseDto
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string DriverName { get; set; }
        public string CarPlate { get; set; }
        public decimal? Balance { get; set; }
    }
}