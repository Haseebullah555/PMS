using Application.Dtos.SupplierLoanPaymentDtos;
using MediatR;
namespace Application.Features.SupplierLoanPayment.Requests.Commands
{
    public class AddSupplierLoanPaymentCommand : IRequest
    {
        public AddSupplierLoanPayment AddSupplierLoanPaymentDto { get; set; }
    }
}