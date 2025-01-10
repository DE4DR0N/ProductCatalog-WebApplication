using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Domain.Abstractions;

public interface IUsersRepository
{
    public Task<IEnumerable<User>> GetAllUsersAsync();
    public Task<User?> GetUserByIdAsync(Guid userId);
    public Task<User?> GetUserByEmailAsync(string email);
    public Task AddUserAsync(User user);
    public Task UpdateUserAsync(User user);
    public Task DeleteUserAsync(Guid id);
}