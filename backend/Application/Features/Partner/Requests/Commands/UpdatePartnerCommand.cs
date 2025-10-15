using Application.Dtos;
using MediatR;

namespace Application.Features.Partner.Requests.Commands
{
    public class UpdatePartnerCommand : IRequest
    {
        public PartnerDto PartnerDto { get; set; }
    }
}