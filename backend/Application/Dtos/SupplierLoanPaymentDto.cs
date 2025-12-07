using Application.Dtos.Common;

namespace Application.Dtos
{
    public class SupplierLoanPaymentDto : BaseDto
    {
        public int SupplierId { get; set; }
        public decimal PaidLoanAmount { get; set; }
        public DateOnly PaymentDate { get; set; }
        public string? Remarks { get; set; }
    }
}