using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        var products = await _unitOfWork.Products.GetAllProductsAsync();
        return products;
    }

    public async Task<Product?> GetProductByIdAsync(Guid id)
    {
        var product = await _unitOfWork.Products.GetProductByIdAsync(id);
        return product;
    }

    public async Task CreateProductAsync(Product product)
    {
        var existingProduct = await _unitOfWork.Products.GetProductByNameAsync(product.Name);
        if (existingProduct != null)
            throw new InvalidOperationException($"Product with name '{product.Name}' already exists.");
        
        await _unitOfWork.Products.CreateProductAsync(product);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(Guid id, Product product)
    {
        var existingProduct = await _unitOfWork.Products.GetProductByNameAsync(product.Name);
        if (existingProduct != null && existingProduct.Id != id)
            throw new InvalidOperationException($"Product with name '{product.Name}' already exists.");
        
        var productToUpdate = await _unitOfWork.Products.GetProductByIdAsync(id);
        if (productToUpdate == null) throw new KeyNotFoundException("Product not found");
        product.Id = id;
        await _unitOfWork.Products.UpdateProductAsync(product);
    }

    public async Task DeleteProductAsync(Guid id)
    {
        var productToDelete = await _unitOfWork.Products.GetProductByIdAsync(id);
        if (productToDelete == null) throw new KeyNotFoundException("Product not found");
        await _unitOfWork.Products.DeleteProductAsync(id);
    }
}