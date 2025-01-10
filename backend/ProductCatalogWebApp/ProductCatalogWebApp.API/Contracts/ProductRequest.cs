namespace ProductCatalogWebApp.API.Contracts;

public record ProductRequest
{
    public required string Name { get; init; }
    public decimal Price { get; init; }
    public string? Description { get; init; }
    public string? NoteGeneral { get; init; }
    public string? NoteSpecial { get; init; }
    public Guid CategoryId { get; init; }
}