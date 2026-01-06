using Application.Dtos.Common;

namespace Application.Dtos.CustomerLoanDtos
{
    public class UpdateCustomerLoanDto : UpdateBaseDto
    {
        public int CustomerId { get; set; }
        public int FuelTypeId { get; set; }
        public decimal FuelAmount { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime LoanDate { get; set; }
        public string? Description { get; set; }
    }
}