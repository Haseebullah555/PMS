using Application.Dtos.Common;

namespace Application.Dtos.CustomerLoanDtos
{
    public class AddCustomerLaonDto : CreateBaseDto
    {
        public int CustomerId { get; set; }
        public int FuelTypeId { get; set; }
        public int FuelGunId { get; set; }
        public decimal FuelAmount { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateOnly LoanDate { get; set; }
        public string? Description { get; set; }
    }
}