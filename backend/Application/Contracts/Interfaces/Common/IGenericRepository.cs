namespace Application.Contracts.Interfaces.Common
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> Get(int id);
        Task<T> Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task<List<T>> AddRanges(List<T> entity);
    }
}
