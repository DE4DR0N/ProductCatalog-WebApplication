namespace ProductCatalogWebApp.Application.Abstractions;

public interface IAuthService
{
    public Task<string> Login(string email, string password);
    public Task<string> Register(string email, string password);
    public Task Logout();
}