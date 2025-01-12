using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.Application.Abstractions;

public interface IProductService
{
    public Task<(IEnumerable<Product> products, int totalPages)> GetAllProductsAsync(string? search,
        ProductFilter filter,
        int? pageNumber,
        int? pageSize);
    public Task<Product?> GetProductByIdAsync(Guid id);
    public Task CreateProductAsync(Product product);
    public Task UpdateProductAsync(Guid id, Product product);
    public Task DeleteProductAsync(Guid id);
}