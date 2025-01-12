using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.Domain.Abstractions;

public interface IProductsRepository
{
    public Task<(IEnumerable<Product> products, int totalPages)> GetAllProductsAsync(string? search,
        ProductFilter filter,
        int? pageNumber,
        int? pageSize);
    public Task<Product?> GetProductByIdAsync(Guid id);
    public Task<Product?> GetProductByNameAsync(string name);
    public Task CreateProductAsync(Product product);
    public Task UpdateProductAsync(Product product);
    public Task DeleteProductAsync(Guid id);
}