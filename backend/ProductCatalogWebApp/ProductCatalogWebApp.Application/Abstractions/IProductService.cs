using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Abstractions;

public interface IProductService
{
    public Task<IEnumerable<Product>> GetAllProductsAsync();
    public Task<Product?> GetProductByIdAsync(Guid id);
    public Task CreateProductAsync(Product product);
    public Task UpdateProductAsync(Guid id, Product product);
    public Task DeleteProductAsync(Guid id);
}