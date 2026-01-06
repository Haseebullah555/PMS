using Application.Dtos.Common;

namespace Application.Dtos.CustomerDtos
{
    public class UpdateCustomerDto : UpdateBaseDto
    {
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public decimal Balance { get; set; } = 0m;
    }
}