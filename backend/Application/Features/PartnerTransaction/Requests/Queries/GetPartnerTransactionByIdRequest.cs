using Application.Dtos;
using MediatR;

namespace Application.Features.PartnerTransaction.Requests.Queries
{
    public class GetPartnerTransactionByIdRequest : IRequest<PartnerTransactionDto>
    {
        public int Id { get; set; }
    }
}