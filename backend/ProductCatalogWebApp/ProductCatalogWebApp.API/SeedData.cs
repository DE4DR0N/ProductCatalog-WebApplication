using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API;

public static class SeedData
{
    public static async Task InitializeAdminAsync(IServiceProvider serviceProvider, IConfiguration configuration)
    {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<IUserService>();

        var adminEmail = configuration["AdminUser:Email"]!;
        var adminPassword = configuration["AdminUser:Password"]!;

        if (await userManager.GetUserByEmailAsync(adminEmail) == null)
        {
            var adminUser = new User
            {
                Email = adminEmail, 
                Password = adminPassword,
                Role = "Admin",
                IsBlocked = false
            };
            await userManager.CreateUserAsync(adminUser);
        }
    }
}
