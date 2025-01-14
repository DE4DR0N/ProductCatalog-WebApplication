using Microsoft.Extensions.Logging;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;
    private readonly TokenService _tokenService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUserService userService, TokenService tokenService, ILogger<AuthService> logger)
    {
        _userService = userService;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<string> Login(string email, string password)
    {
        _logger.LogInformation("Attempting to log in user with email {Email}", email);
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null || !BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password))
        {
            _logger.LogWarning("Invalid login attempt for email {Email}", email);
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var token = _tokenService.GenerateToken(user.Email, user.Role, user.IsBlocked);
        _logger.LogInformation("User {Email} logged in successfully", email);
        return token;
    }

    public async Task<string> Register(string email, string password)
    {
        _logger.LogInformation("Attempting to register user with email {Email}", email);
        var existingUser = await _userService.GetUserByEmailAsync(email);
        
        if (existingUser != null)
        {
            _logger.LogWarning("User registration failed. User with email {Email} already exists", email);
            throw new InvalidOperationException("User already exists");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            Password = password,
            Role = "User",
            IsBlocked = false
        };
        
        await _userService.CreateUserAsync(user);
        _logger.LogInformation("User {Email} registered successfully", email);
        return "User registration successful";
    }
    
    public async Task Logout()
    {
        _logger.LogInformation("User logging out");
        await Task.CompletedTask;
    }
}