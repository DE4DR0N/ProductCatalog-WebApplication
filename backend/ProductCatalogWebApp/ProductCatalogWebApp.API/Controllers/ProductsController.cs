using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductsController(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] ProductFilter filter, 
        [FromQuery] string? search, 
        [FromQuery] int? page, 
        [FromQuery] int? pageSize)
    {
        var products = await _productService.GetAllProductsAsync(search, filter, page, pageSize);

        if (User.IsInRole("User"))
        {
            var productsResponse = _mapper.Map<IEnumerable<ProductSimpleUserResponse>>(products.products);
            return Ok(new { productsResponse, products.totalPages });
        }
        else
        {
            var productsResponse = _mapper.Map<IEnumerable<ProductResponse>>(products.products);
            return Ok(new { productsResponse, products.totalPages });
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProductById([FromRoute] Guid id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (User.IsInRole("User"))
        {
            var productResponse = _mapper.Map<ProductSimpleUserResponse>(product);
            return Ok(productResponse);
        }
        else
        {
            var productResponse = _mapper.Map<ProductResponse>(product);
            return Ok(productResponse);
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct([FromBody] ProductRequest productRequest)
    {
        var product = _mapper.Map<Product>(productRequest);
        if (User.IsInRole("User")) product.NoteSpecial = null;
        await _productService.CreateProductAsync(product);
        
        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, [FromBody] ProductRequest productRequest)
    {
        var product = _mapper.Map<Product>(productRequest);
        if (User.IsInRole("User")) product.NoteSpecial = null;
        await _productService.UpdateProductAsync(id, product);
        
        return Ok();
    }

    [Authorize(Roles = "AdvancedUser")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
    {
        await _productService.DeleteProductAsync(id);
        
        return NoContent();
    }
}