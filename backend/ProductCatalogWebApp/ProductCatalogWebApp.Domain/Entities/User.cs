namespace ProductCatalogWebApp.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public required string Email { get; init; }
    public required string Password { get; set; }
    public required string Role { get; init; }
    public bool IsBlocked { get; set; }
}