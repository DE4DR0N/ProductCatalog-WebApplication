using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Domain.Abstractions;

public interface ICategoriesRepository
{
    public Task<IEnumerable<Category>> GetAllCategoriesAsync();
    public Task<Category?> GetCategoryByIdAsync(Guid id);
    public Task<Category?> GetCategoryByNameAsync(string name);
    public Task CreateCategoryAsync(Category category);
    public Task UpdateCategoryAsync(Category category);
    public Task DeleteCategoryAsync(Guid id);
}