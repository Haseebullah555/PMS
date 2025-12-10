

using Application.Dtos;
using MediatR;
namespace Application.Features.Purchase.Requests.Commands
{
    public class AddPuchasePaymentCommand : IRequest
    {
        public SupplierLoanPaymentDto SupplierLoanPaymentDto { get; set; }
    }
}