using Microsoft.AspNetCore.Http;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;
    private readonly TokenService _tokenService;
    private readonly IHttpContextAccessor _httpContext;

    public AuthService(IUserService userService, TokenService tokenService, IHttpContextAccessor httpContext)
    {
        _userService = userService;
        _tokenService = tokenService;
        _httpContext = httpContext;
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null || !BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password))
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var token = _tokenService.GenerateToken(user.Email, user.Role, user.IsBlocked);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(60)
        };
        
        _httpContext.HttpContext?.Response.Cookies.Append("accessToken", token, cookieOptions);
        return token;
    }

    public async Task<string> Register(string email, string password)
    {
        var existingUser = await _userService.GetUserByEmailAsync(email);
        
        if (existingUser != null) throw new InvalidOperationException("User already exists");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            Password = password,
            Role = "User",
            IsBlocked = false
        };
        
        await _userService.CreateUserAsync(user);
        return "User registration successful";
    }
    
    public async Task Logout()
    {
        _httpContext.HttpContext?.Response.Cookies.Delete("accessToken");
        await Task.CompletedTask;
    }
}