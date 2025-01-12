using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly IMapper _mapper;

    public CategoriesController(ICategoryService categoryService, IMapper mapper)
    {
        _categoryService = categoryService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories([FromQuery] int? page, [FromQuery] int? pageSize)
    {
        var categories = await _categoryService.GetAllCategoriesAsync(page, pageSize);
        var categoriesResponse = _mapper.Map<IEnumerable<CategoryResponse>>(categories.categories);
        
        return Ok(new { categoriesResponse, categories.totalPages });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        var categoryResponse = _mapper.Map<CategoryResponse>(category);
        
        return Ok(categoryResponse);
    }

    [Authorize(Roles = "AdvancedUser")]
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryRequest categoryRequest)
    {
        var category = _mapper.Map<Category>(categoryRequest);
        await _categoryService.CreateCategoryAsync(category);
        
        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
    }

    [Authorize(Roles = "AdvancedUser")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] CategoryRequest categoryRequest)
    {
        var category = _mapper.Map<Category>(categoryRequest);
        await _categoryService.UpdateCategoryAsync(id, category);
        
        return Ok();
    }
    
    [Authorize(Roles = "AdvancedUser")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
    {
        await _categoryService.DeleteCategoryAsync(id);
        
        return NoContent();
    }
}