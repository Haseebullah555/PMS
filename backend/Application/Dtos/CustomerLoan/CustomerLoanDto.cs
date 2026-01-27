namespace Application.Dtos.CustomerLoan
{
    public class CustomerLoanDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int FuelTypeId { get; set; }
        public decimal FuelAmount { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateOnly LoanDate { get; set; }
        public string? Description { get; set; }
    }
}