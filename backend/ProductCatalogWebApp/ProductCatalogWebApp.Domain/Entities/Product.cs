namespace ProductCatalogWebApp.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public required string Name { get; init; }
    public decimal Price { get; init; }
    public string? Description { get; init; }
    public string? NoteGeneral { get; init; }
    public string? NoteSpecial { get; set; }
    public Guid CategoryId { get; init; }
    
    public virtual required Category Category { get; init; }
}