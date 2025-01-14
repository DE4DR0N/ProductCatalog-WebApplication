using Microsoft.EntityFrameworkCore;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;
using static ProductCatalogWebApp.Persistence.Extensions.ProductExtensions;

namespace ProductCatalogWebApp.Persistence.Repositories;

public class ProductsRepository(CatalogDbContext catalogDbContext) : IProductsRepository
{
    public async Task<(IEnumerable<Product> products, int totalPages)> GetAllProductsAsync(string? search,
        ProductFilter filter,
        int? pageNumber,
        int? pageSize)
    {
        var size = pageSize ?? 10;
        var totalProducts = await catalogDbContext.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .Filter(filter)
            .CountAsync();
        var totalPages = (int)Math.Ceiling(totalProducts / (double)size);
        
        var products = await catalogDbContext.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .Filter(filter)
            .Search(search)
            .OrderBy(p => p.Name)
            .Paginate(pageNumber, pageSize)
            .ToListAsync();
        
        return (products, totalPages);
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