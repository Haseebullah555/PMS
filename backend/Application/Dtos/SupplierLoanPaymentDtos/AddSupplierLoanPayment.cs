using Application.Dtos.Common;

namespace Application.Dtos.SupplierLoanPaymentDtos
{
    public class AddSupplierLoanPayment : CreateBaseDto
    {
        public int SupplierId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}