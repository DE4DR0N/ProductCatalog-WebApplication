using Microsoft.EntityFrameworkCore;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Persistence.Repositories;

public class CategoriesRepository(CatalogDbContext catalogDbContext) : ICategoriesRepository
{
    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        var categories = await catalogDbContext.Categories
            .Include(c => c.Products)
            .AsNoTracking()
            .ToListAsync();
        
        return categories;
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