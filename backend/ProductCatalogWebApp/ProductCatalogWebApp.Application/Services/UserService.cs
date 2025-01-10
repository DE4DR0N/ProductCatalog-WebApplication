using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        var users = await _unitOfWork.Users.GetAllUsersAsync();
        return users;
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        var user = await _unitOfWork.Users.GetUserByIdAsync(userId);
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var user = await _unitOfWork.Users.GetUserByEmailAsync(email);
        return user;
    }

    public async Task CreateUserAsync(User user)
    {
        user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
        await _unitOfWork.Users.AddUserAsync(user);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(Guid id, User user)
    {
        var userToUpdate = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (userToUpdate == null) throw new KeyNotFoundException("User not found");
        user.Id = id;
        user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
        await _unitOfWork.Users.UpdateUserAsync(user);
    }

    public async Task DeleteUserAsync(Guid id)
    {
        var userToDelete = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (userToDelete == null) throw new KeyNotFoundException("User not found");
        await _unitOfWork.Users.DeleteUserAsync(id);
    }

    public async Task BlockUserAsync(Guid id, bool isBlocked)
    {
        var user = await _unitOfWork.Users.GetUserByIdAsync(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        user.IsBlocked = isBlocked;
        await _unitOfWork.Users.UpdateUserAsync(user);
    }
}