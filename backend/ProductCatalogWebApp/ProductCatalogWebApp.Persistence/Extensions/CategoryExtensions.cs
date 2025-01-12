using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.Persistence.Extensions;

public static class CategoryExtensions
{
    public static IQueryable<Category> Paginate(this IQueryable<Category> query, int? pageNumber, int? pageSize)
    {
        var number = pageNumber ?? 1;
        var size = pageSize ?? 20;
        
        return query.Skip((number - 1) * size).Take(size);
    }
}