namespace ProductCatalogWebApp.API.Contracts;

public record AuthResponse
{
    public required string AccessToken { get; init; }
}