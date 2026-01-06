using Application.Dtos.Common;

namespace Application.Dtos
{
    public class CustomerLoanPaymentDto: BaseDto
    {
        public int CustomerLoanId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}