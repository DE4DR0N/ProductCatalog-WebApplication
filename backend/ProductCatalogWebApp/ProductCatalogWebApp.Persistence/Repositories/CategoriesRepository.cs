using Microsoft.EntityFrameworkCore;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using static ProductCatalogWebApp.Persistence.Extensions.CategoryExtensions;

namespace ProductCatalogWebApp.Persistence.Repositories;

public class CategoriesRepository(CatalogDbContext catalogDbContext) : ICategoriesRepository
{
    public async Task<(IEnumerable<Category> categories, int totalPages)> GetAllCategoriesAsync(int? pageNumber, int? pageSize)
    {
        var size = pageSize ?? 20;
        var totalCategories = await catalogDbContext.Categories
            .AsNoTracking()
            .CountAsync();
        var totalPages = (int)Math.Ceiling(totalCategories / (double)size);
        
        var categories = await catalogDbContext.Categories
            .Include(c => c.Products)
            .AsNoTracking()
            .Paginate(pageNumber, pageSize)
            .ToListAsync();
        
        return (categories, totalPages);
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        var category = await catalogDbContext.Categories
            .Include(c => c.Products)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
        
        return category;
    }

    public async Task<Category?> GetCategoryByNameAsync(string name)
    {
        var category = await catalogDbContext.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Name == name);
        
        return category;
    }

    public async Task CreateCategoryAsync(Category category)
    {
        await catalogDbContext.Categories.AddAsync(category);
    }

    public async Task UpdateCategoryAsync(Category category)
    {
        await catalogDbContext.Categories
            .Where(c => c.Id == category.Id)
            .ExecuteUpdateAsync(calls => calls
                .SetProperty(p => p.Name, category.Name));
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        await catalogDbContext.Categories
            .Where(c => c.Id == id)
            .ExecuteDeleteAsync();
    }
}