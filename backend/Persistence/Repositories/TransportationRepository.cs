using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class TransportationRepository : GenericRepository<Transportation>, ITransportationRepository
    {
        public TransportationRepository(AppDbContext context) : base(context)
        {
        }
    }
}