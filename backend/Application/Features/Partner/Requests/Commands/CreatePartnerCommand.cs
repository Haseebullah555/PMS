using Application.Dtos;
using MediatR;

namespace Application.Features.Partner.Requests.Commands
{
    public class CreatePartnerCommand : IRequest
    {
        public PartnerDto PartnerDto { get; set; }
    }
}