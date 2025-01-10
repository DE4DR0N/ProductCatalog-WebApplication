using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Domain.Abstractions;

public interface IProductsRepository
{
    public Task<IEnumerable<Product>> GetAllProductsAsync();
    public Task<Product?> GetProductByIdAsync(Guid id);
    public Task<Product?> GetProductByNameAsync(string name);
    public Task CreateProductAsync(Product product);
    public Task UpdateProductAsync(Product product);
    public Task DeleteProductAsync(Guid id);
}