

using Application.Dtos;
using MediatR;
namespace Application.Features.SupplierLoanPayment.Requests.Commands
{
    public class AddPuchasePaymentCommand : IRequest
    {
        public SupplierLoanPaymentDto SupplierLoanPaymentDto { get; set; }
    }
}