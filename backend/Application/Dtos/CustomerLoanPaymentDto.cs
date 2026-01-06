using Application.Dtos.Common;

namespace Application.Dtos
{
    public class CustomerLoanPaymentDto : CreateBaseDto
    {
        public int CustomerLoanId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}