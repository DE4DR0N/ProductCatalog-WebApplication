using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Persistence.Repositories;

namespace ProductCatalogWebApp.Persistence;

public class UnitOfWork(CatalogDbContext context) : IUnitOfWork
{
    private IProductsRepository _products;
    private ICategoriesRepository _categories;
    private IUsersRepository _users;

    public IProductsRepository Products
    {
        get
        {
            if (_products == null) 
                _products = new ProductsRepository(context);
            return _products;
        }
    }

    public ICategoriesRepository Categories
    {
        get
        {
            if (_categories == null) 
                _categories = new CategoriesRepository(context);
            return _categories;
        }
    }
    
    public IUsersRepository Users
    {
        get
        {
            if (_users == null) 
                _users = new UsersRepository(context);
            return _users;
        }
    }

    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
    
    private bool _disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing)
        {
            context.Dispose();
        }
        _disposed = true;
    }
 
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}