using Application.Contracts.Interfaces;
using Domain.Models;
using Persistence.Database;
using Persistence.Repositories.Common;

namespace Persistence.Repositories
{
    public class ExtraExpensesRepository : GenericRepository<ExtraExpenses>, IExtraExpensesRepository
    {
        public ExtraExpensesRepository(AppDbContext context) : base(context)
        {
        }
    }
}