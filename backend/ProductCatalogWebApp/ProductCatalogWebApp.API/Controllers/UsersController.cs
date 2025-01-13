using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UsersController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        var usersResponse = _mapper.Map<List<UserResponse>>(users);
        
        return Ok(usersResponse);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserById([FromRoute] Guid id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        var userResponse = _mapper.Map<UserResponse>(user);
        
        return Ok(userResponse);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] UserRequest userRequest)
    {
        var user = _mapper.Map<User>(userRequest);
        await _userService.CreateUserAsync(user);
        
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateUser([FromRoute] Guid id, [FromBody] UserRequest userRequest)
    {
        var user = _mapper.Map<User>(userRequest);
        await _userService.UpdateUserAsync(id, user);
        
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
    {
        await _userService.DeleteUserAsync(id);
        
        return NoContent();
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}/block")]
    public async Task<IActionResult> BlockUser([FromRoute] Guid id, [FromBody] bool isBlocked)
    {
        await _userService.BlockUserAsync(id, isBlocked);
        
        return NoContent();
    }
}