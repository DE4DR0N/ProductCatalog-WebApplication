using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.Application.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<ProductService> _logger;
    private readonly IMemoryCache _cache; 

    public ProductService(IUnitOfWork unitOfWork, ILogger<ProductService> logger, IMemoryCache cache)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _cache = cache;
    }

    public async Task<(IEnumerable<Product> products, int totalPages)> GetAllProductsAsync(string? search,
        ProductFilter filter,
        int? pageNumber,
        int? pageSize)
    {
        _logger.LogInformation("Getting all products with search: {Search} and filter: {Filter}", search, filter);
        var cacheKey = $"Products_{search}_{filter}_{pageNumber}_{pageSize}";

        if (!_cache.TryGetValue(cacheKey, out (IEnumerable<Product>, int) products))
        {
            {
                _logger.LogInformation("Cache miss for key: {CacheKey}", cacheKey);
                products = await _unitOfWork.Products.GetAllProductsAsync(search, filter, pageNumber, pageSize);

                _cache.Set(cacheKey, products, TimeSpan.FromMinutes(5));
            }
        }
        else
        {
            _logger.LogInformation("Cache hit for key: {CacheKey}", cacheKey);
        }
        
        return products;
    }

    public async Task<Product?> GetProductByIdAsync(Guid id)
    {
        _logger.LogInformation("Getting product by ID: {Id}", id);
        var cacheKey = $"Product_{id}";
        if (!_cache.TryGetValue(cacheKey, out Product? product))
        {
            _logger.LogInformation("Cache miss for key: {CacheKey}", cacheKey);
            product = await _unitOfWork.Products.GetProductByIdAsync(id);
            
            if (product != null) _cache.Set(cacheKey, product, TimeSpan.FromMinutes(10));
        }
        else
        {
            _logger.LogInformation("Cache hit for key: {CacheKey}", cacheKey);
        }

        return product;
    }

    public async Task CreateProductAsync(Product product)
    {
        _logger.LogInformation("Creating product: {ProductName}", product.Name);
        var existingProduct = await _unitOfWork.Products.GetProductByNameAsync(product.Name);
        if (existingProduct != null)
        {
            _logger.LogWarning("Product with name '{ProductName}' already exists.", product.Name);
            throw new InvalidOperationException($"Product with name '{product.Name}' already exists.");
        }

        await _unitOfWork.Products.CreateProductAsync(product);
        await _unitOfWork.SaveChangesAsync();
        
        _cache.Remove("Products");
    }

    public async Task UpdateProductAsync(Guid id, Product product)
    {
        _logger.LogInformation("Updating product ID: {Id} with name: {ProductName}", id, product.Name);
        var existingProduct = await _unitOfWork.Products.GetProductByNameAsync(product.Name);
        if (existingProduct != null && existingProduct.Id != id)
        {
            _logger.LogWarning("Product with name '{ProductName}' already exists.", product.Name);
            throw new InvalidOperationException($"Product with name '{product.Name}' already exists.");
        }

        var productToUpdate = await _unitOfWork.Products.GetProductByIdAsync(id);
        if (productToUpdate == null)
        {
            _logger.LogWarning("Product with ID: {Id} not found.", id);
            throw new KeyNotFoundException("Product not found");
        }

        product.Id = id;
        await _unitOfWork.Products.UpdateProductAsync(product);
        
        _cache.Remove($"Product_{id}");
        _cache.Remove("Products");
    }

    public async Task DeleteProductAsync(Guid id)
    {
        _logger.LogInformation("Deleting product ID: {Id}", id);
        var productToDelete = await _unitOfWork.Products.GetProductByIdAsync(id);
        if (productToDelete == null)
        {
            _logger.LogWarning("Product with ID: {Id} not found.", id);
            throw new KeyNotFoundException("Product not found");
        }

        await _unitOfWork.Products.DeleteProductAsync(id);
        
        _cache.Remove($"Product_{id}");
        _cache.Remove("Products");
    }
}
