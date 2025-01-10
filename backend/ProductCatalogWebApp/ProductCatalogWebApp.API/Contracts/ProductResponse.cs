namespace ProductCatalogWebApp.API.Contracts;

public record ProductResponse
{
    public Guid Id { get; init; }
    public required string Name { get; init; }
    public decimal Price { get; init; }
    public string? Description { get; init; }
    public string? NoteGeneral { get; init; }
    public string? NoteSpecial { get; init; }
    public required CategoryInProductResponse Category { get; init; }
}

public record ProductSimpleUserResponse
{
    public Guid Id { get; init; }
    public required string Name { get; init; }
    public decimal Price { get; init; }
    public string? Description { get; init; }
    public string? NoteGeneral { get; init; }
    public required CategoryInProductResponse Category { get; init; }
}

public record CategoryInProductResponse
{
    public Guid Id { get; init; } 
    public required string Name { get; init; }
}
