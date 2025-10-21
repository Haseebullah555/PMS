using Application.Dtos;
using MediatR;

namespace Application.Features.Partner.Requests.Queries
{
    public class GetPartnersListRequest : IRequest<List<PartnerDto>>
    {
        
    }
}