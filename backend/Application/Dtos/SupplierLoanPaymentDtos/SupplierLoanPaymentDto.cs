using Application.Dtos.Common;

namespace Application.Dtos.SupplierLoanPaymentDtos
{
    public class SupplierLoanPaymentDto : CreateBaseDto
    {
        public int SupplierId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}