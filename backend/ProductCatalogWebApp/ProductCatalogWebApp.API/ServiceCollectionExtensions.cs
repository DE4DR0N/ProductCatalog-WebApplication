using ProductCatalogWebApp.API.Mappings;
using ProductCatalogWebApp.Application.Abstractions;
using ProductCatalogWebApp.Application.Services;
using ProductCatalogWebApp.Domain.Abstractions;
using ProductCatalogWebApp.Persistence;
using ProductCatalogWebApp.Persistence.Repositories;

namespace ProductCatalogWebApp.API;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<ICategoriesRepository, CategoriesRepository>();
        services.AddScoped<IUsersRepository, UsersRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<TokenService>();
        
        services.AddHttpContextAccessor();
        
        services.AddAutoMapper(
            typeof(ProductMappingProfile),
            typeof(CategoryMappingProfile),
            typeof(UserMappingProfile));
    }
}