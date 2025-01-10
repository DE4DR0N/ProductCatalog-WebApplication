namespace ProductCatalogWebApp.API.Contracts;

public record CategoryResponse
{
    public Guid Id { get; init; }
    public required string Name { get; init; }
    public IEnumerable<ProductInCategoryResponse> Products { get; init; } = new List<ProductInCategoryResponse>();
}

public record ProductInCategoryResponse
{
    public Guid Id { get; init; } 
    public required string Name { get; init; } 
    public decimal Price { get; init; } 
    public string? Description { get; init; } 
}
