namespace ProductCatalogWebApp.Domain.Entities;

public class Category
{
    public Guid Id { get; set; }
    public required string Name { get; init; }
    public virtual ICollection<Product> Products { get; init; } = new List<Product>();
}