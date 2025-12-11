

using Application.Dtos;
using MediatR;
namespace Application.Features.SupplierLoanPayment.Requests.Commands
{
    public class AddSupplierLoanPaymentCommand : IRequest
    {
        public SupplierLoanPaymentDto SupplierLoanPaymentDto { get; set; }
    }
}