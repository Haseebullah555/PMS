namespace Application.Dtos.CustomerLoanPaymentDtos
{
    public class CustomerLoanPaymentDto
    {
        public int Id { get; set; }
        public int CustomerLoanId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}