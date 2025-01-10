namespace ProductCatalogWebApp.API.Contracts;

public record CategoryRequest
{
    public required string Name { get; init; }
}