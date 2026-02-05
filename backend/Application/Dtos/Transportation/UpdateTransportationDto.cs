using Application.Dtos.Common;

namespace Application.Dtos.Transportation
{
    public class UpdateTransportationDto : UpdateBaseDto
    {
        public string CompanyName { get; set; }
        public string DriverName { get; set; }
        public string CarPlate { get; set; }
        public string PhoneNumber { get; set; }
        public string Remarks { get; set; }
    }
}