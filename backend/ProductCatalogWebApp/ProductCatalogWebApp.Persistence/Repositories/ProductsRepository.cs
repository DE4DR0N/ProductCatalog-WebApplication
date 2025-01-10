using Microsoft.EntityFrameworkCore;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Persistence.Repositories;

public class ProductsRepository(CatalogDbContext catalogDbContext) : IProductsRepository
{
    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        var products = await catalogDbContext.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
        
        return products;
    }

    public async Task<Product?> GetProductByIdAsync(Guid id)
    {
        var product = await catalogDbContext.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);
        
        return product;
    }

    public async Task<Product?> GetProductByNameAsync(string name)
    {
        var product = await catalogDbContext.Products
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Name == name);
        
        return product;
    }

    public async Task CreateProductAsync(Product product)
    {
        await catalogDbContext.Products.AddAsync(product);
    }

    public async Task UpdateProductAsync(Product product)
    {
        await catalogDbContext.Products
            .Where(p => p.Id == product.Id)
            .ExecuteUpdateAsync(calls => calls
                .SetProperty(p => p.Name, product.Name)
                .SetProperty(p => p.Description, product.Description)
                .SetProperty(p => p.Price, product.Price)
                .SetProperty(p => p.NoteGeneral, product.NoteGeneral)
                .SetProperty(p => p.NoteSpecial, product.NoteSpecial)
                .SetProperty(p => p.CategoryId, product.CategoryId));
    }

    public async Task DeleteProductAsync(Guid id)
    {
        await catalogDbContext.Products
            .Where(p => p.Id == id)
            .ExecuteDeleteAsync();
    }
}