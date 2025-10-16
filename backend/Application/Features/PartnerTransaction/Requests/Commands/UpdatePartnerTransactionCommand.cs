using Application.Dtos;
using MediatR;

namespace Application.Features.PartnerTransaction.Requests.Commands
{
    public class UpdatePartnerTransactionCommand : IRequest
    {
        public PartnerTransactionDto PartnerTransactionDto { get; set; }
    }
}