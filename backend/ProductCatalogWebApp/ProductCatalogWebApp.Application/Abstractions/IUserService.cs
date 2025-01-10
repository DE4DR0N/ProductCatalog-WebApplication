using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Application.Abstractions;

public interface IUserService
{
    public Task<IEnumerable<User>> GetAllUsersAsync();
    public Task<User?> GetUserByIdAsync(Guid userId);
    public Task<User?> GetUserByEmailAsync(string email);
    public Task CreateUserAsync(User user);
    public Task UpdateUserAsync(Guid id, User user);
    public Task DeleteUserAsync(Guid id);
    public Task BlockUserAsync(Guid id, bool isBlocked);
}