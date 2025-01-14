using Microsoft.EntityFrameworkCore;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Persistence.Repositories;

public class UsersRepository(CatalogDbContext catalogDbContext) : IUsersRepository
{
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        var users = await catalogDbContext.Users
            .AsNoTracking()
            .OrderBy(u => u.Role)
            .ToListAsync();
        
        return users;
    }

    public async Task<User?> GetUserByIdAsync(Guid userId)
    {
        var user = await catalogDbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId);
        
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var user = await catalogDbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email);
        
        return user;
    }

    public async Task AddUserAsync(User user)
    {
        await catalogDbContext.Users.AddAsync(user);
    }

    public async Task UpdateUserAsync(User user)
    {
        await catalogDbContext.Users
            .Where(u => u.Id == user.Id)
            .ExecuteUpdateAsync(calls => calls
                .SetProperty(x => x.Password, user.Password)
                .SetProperty(x => x.Email, user.Email)
                .SetProperty(x => x.Role, user.Role)
                .SetProperty(x => x.IsBlocked, user.IsBlocked));
    }

    public async Task DeleteUserAsync(Guid id)
    {
        await catalogDbContext.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync();
    }
}