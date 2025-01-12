namespace ProductCatalogWebApp.Domain.Filters;

public record ProductFilter
{
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    public string? CategoryName { get; init; }
}