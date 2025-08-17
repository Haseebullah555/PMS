using Application.Contracts.Interfaces;
using Application.Contracts.Interfaces.Common;
using Persistence.Database;

namespace Persistence.Repositories.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        #region Private fields

        #endregion
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }



        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}