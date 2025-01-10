namespace ProductCatalogWebApp.API.Contracts;

public record UserRequest
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string Role { get; init; }
    public bool IsBlocked { get; init; }
}