using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<(IEnumerable<Category> categories, int totalPages)> GetAllCategoriesAsync(int? page, int? pageSize)
    {
        var categories = await _unitOfWork.Categories.GetAllCategoriesAsync(page, pageSize);
        return categories;
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        var category = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        return category;
    }

    public async Task CreateCategoryAsync(Category category)
    {
        var existingCategory = await _unitOfWork.Categories.GetCategoryByNameAsync(category.Name);
        if (existingCategory != null)
            throw new InvalidOperationException($"Category with name '{category.Name}' already exists");
        
        await _unitOfWork.Categories.CreateCategoryAsync(category);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateCategoryAsync(Guid id, Category category)
    {
        var existingCategory = await _unitOfWork.Categories.GetCategoryByNameAsync(category.Name);
        if (existingCategory != null && existingCategory.Id != id)
            throw new InvalidOperationException($"Category with name '{category.Name}' already exists");
        
        var categoryToUpdate = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        if (categoryToUpdate == null) throw new KeyNotFoundException("Category not found");
        category.Id = id;
        await _unitOfWork.Categories.UpdateCategoryAsync(category);
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var categoryToDelete = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        if (categoryToDelete == null) throw new KeyNotFoundException("Category not found");
        await _unitOfWork.Categories.DeleteCategoryAsync(id);
    }
}