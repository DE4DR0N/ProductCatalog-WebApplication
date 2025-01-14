using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace ProductCatalogWebApp.Application.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<UserService> _logger;

    public UserService(IUnitOfWork unitOfWork, ILogger<UserService> logger)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        _logger.LogInformation("Getting all users.");
        var users = await _unitOfWork.Users.GetAllUsersAsync();
        return users;
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        _logger.LogInformation("Getting user by ID: {userId}", userId);
        var user = await _unitOfWork.Users.GetUserByIdAsync(userId);
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        _logger.LogInformation("Getting user by email: {email}", email);
        var user = await _unitOfWork.Users.GetUserByEmailAsync(email);
        return user;
    }

    public async Task CreateUserAsync(User user)
    {
        _logger.LogInformation("Creating new user with email: {user.Email}", user.Email);
        user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
        await _unitOfWork.Users.AddUserAsync(user);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(Guid id, User user)
    {
        _logger.LogInformation("Updating user with ID: {id}", id);
        var userToUpdate = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (userToUpdate == null)
        {
            _logger.LogWarning("User not found with ID: {id}", id);
            throw new KeyNotFoundException("User not found");
        }
        user.Id = id;
        user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
        await _unitOfWork.Users.UpdateUserAsync(user);
    }

    public async Task DeleteUserAsync(Guid id)
    {
        _logger.LogInformation("Deleting user with ID: {id}", id);
        var userToDelete = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (userToDelete == null)
        {
            _logger.LogWarning("User not found with ID: {id}", id);
            throw new KeyNotFoundException("User not found");
        }
        await _unitOfWork.Users.DeleteUserAsync(id);
    }

    public async Task BlockUserAsync(Guid id, bool isBlocked)
    {
        _logger.LogInformation("Blocking user with ID: {id}, IsBlocked: {isBlocked}", id, isBlocked);
        var user = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (user == null)
        {
            _logger.LogWarning("User not found with ID: {id}", id);
            throw new KeyNotFoundException("User not found");
        }
        user.IsBlocked = isBlocked;
        await _unitOfWork.Users.UpdateUserAsync(user);
    }
}
