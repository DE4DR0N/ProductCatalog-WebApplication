using Microsoft.Extensions.Logging;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.Application.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IUnitOfWork unitOfWork, ILogger<ProductService> logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<(IEnumerable<Product> products, int totalPages)> GetAllProductsAsync(string? search,
        ProductFilter filter,
        int? pageNumber,
        int? pageSize)
    {
        _logger.LogInformation("Getting all products with search: {Search} and filter: {Filter}", search, filter);
        var products = await _unitOfWork.Products
            .GetAllProductsAsync(search, filter, pageNumber, pageSize);
        return products;
    }

    public async Task<Product?> GetProductByIdAsync(Guid id)
    {
        _logger.LogInformation("Getting product by ID: {Id}", id);
        var product = await _unitOfWork.Products.GetProductByIdAsync(id);
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
    }
}
