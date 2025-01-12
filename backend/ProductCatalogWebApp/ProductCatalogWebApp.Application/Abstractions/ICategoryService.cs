using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Abstractions;

public interface ICategoryService
{
    public Task<(IEnumerable<Category> categories, int totalPages)> GetAllCategoriesAsync(int? page, int? pageSize);
    public Task<Category?> GetCategoryByIdAsync(Guid id);
    public Task CreateCategoryAsync(Category category);
    public Task UpdateCategoryAsync(Guid id, Category category);
    public Task DeleteCategoryAsync(Guid id);
}