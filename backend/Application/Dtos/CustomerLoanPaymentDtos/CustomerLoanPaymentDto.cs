namespace Application.Dtos.CustomerLoanPaymentDtos
{
    public class CustomerLoanPaymentDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}