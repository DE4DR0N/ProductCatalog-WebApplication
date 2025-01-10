namespace ProductCatalogWebApp.Domain.Abstractions;

public interface IUnitOfWork : IDisposable
{
    public IProductsRepository Products { get; }
    public ICategoriesRepository Categories { get; }
    public IUsersRepository Users { get; }
    public Task<int> SaveChangesAsync();
}