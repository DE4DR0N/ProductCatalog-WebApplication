using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Application.Abstractions;

namespace ProductCatalogWebApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthorizationController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthRequest request)
    {
        var token = await _authService.Login(request.Email, request.Password);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(60)
        };
        
        HttpContext.Response.Cookies.Append("accessToken", token, cookieOptions);
        return Ok(token);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthRequest request)
    {
        var result = await _authService.Register(request.Email, request.Password);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        HttpContext.Response.Cookies.Delete("accessToken");
        await _authService.Logout();
        return NoContent();
    }
}