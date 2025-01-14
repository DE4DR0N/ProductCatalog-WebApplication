using Microsoft.Extensions.Logging;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CategoryService> _logger;

    public CategoryService(IUnitOfWork unitOfWork, ILogger<CategoryService> logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<(IEnumerable<Category> categories, int totalPages)> GetAllCategoriesAsync(int? page, int? pageSize)
    {
        _logger.LogInformation("Getting categories for page {Page} with page size {PageSize}", page, pageSize);
        var categories = await _unitOfWork.Categories.GetAllCategoriesAsync(page, pageSize);
        return categories;
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        _logger.LogInformation("Getting category with ID {CategoryId}", id);
        var category = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        return category;
    }

    public async Task CreateCategoryAsync(Category category)
    {
        _logger.LogInformation("Creating category with name {CategoryName}", category.Name);
        var existingCategory = await _unitOfWork.Categories.GetCategoryByNameAsync(category.Name);
        if (existingCategory != null)
        {
            _logger.LogWarning("Category creation failed. Category with name {CategoryName} already exists", category.Name);
            throw new InvalidOperationException($"Category with name '{category.Name}' already exists");
        }
        
        await _unitOfWork.Categories.CreateCategoryAsync(category);
        await _unitOfWork.SaveChangesAsync();
        _logger.LogInformation("Category {CategoryName} created successfully", category.Name);
    }

    public async Task UpdateCategoryAsync(Guid id, Category category)
    {
        _logger.LogInformation("Updating category with ID {CategoryId}", id);
        var existingCategory = await _unitOfWork.Categories.GetCategoryByNameAsync(category.Name);
        if (existingCategory != null && existingCategory.Id != id)
        {
            _logger.LogWarning("Category update failed. Category with name {CategoryName} already exists", category.Name);
            throw new InvalidOperationException($"Category with name '{category.Name}' already exists");
        }
        
        var categoryToUpdate = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        if (categoryToUpdate == null) throw new KeyNotFoundException("Category not found");
        category.Id = id;
        await _unitOfWork.Categories.UpdateCategoryAsync(category);
        _logger.LogInformation("Category {CategoryName} updated successfully", category.Name);
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        _logger.LogInformation("Deleting category with ID {CategoryId}", id);
        var categoryToDelete = await _unitOfWork.Categories.GetCategoryByIdAsync(id);
        if (categoryToDelete == null) throw new KeyNotFoundException("Category not found");
        await _unitOfWork.Categories.DeleteCategoryAsync(id);
        _logger.LogInformation("Category with ID {CategoryId} deleted successfully", id);
    }
}