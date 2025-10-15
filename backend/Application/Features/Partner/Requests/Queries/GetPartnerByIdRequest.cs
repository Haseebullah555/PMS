using Application.Dtos;
using MediatR;

namespace Application.Features.Partner.Requests.Queries
{
    public class GetPartnerByIdRequest : IRequest<PartnerDto>
    {
        public int Id { get; set; }
    }
}