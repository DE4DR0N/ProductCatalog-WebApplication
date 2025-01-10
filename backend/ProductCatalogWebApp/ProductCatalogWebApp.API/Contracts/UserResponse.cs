namespace ProductCatalogWebApp.API.Contracts;

public class UserResponse
{
    public Guid Id { get; init; }
    public required string Email { get; init; }
    public required string Role { get; init; }
    public bool IsBlocked { get; init; }
}