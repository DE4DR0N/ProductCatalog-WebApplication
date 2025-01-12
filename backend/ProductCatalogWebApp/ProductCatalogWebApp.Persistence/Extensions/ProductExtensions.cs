using ProductCatalogWebApp.Domain.Entities;
using ProductCatalogWebApp.Domain.Filters;

namespace ProductCatalogWebApp.Persistence.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Filter(this IQueryable<Product> query, ProductFilter filter)
    {
        if (filter.MinPrice != null)
        {
            query = query.Where(p => p.Price >= filter.MinPrice);
        }

        if (filter.MaxPrice != null)
        {
            query = query.Where(p => p.Price <= filter.MaxPrice);
        }

        if (!string.IsNullOrEmpty(filter.CategoryName))
        {
            query = query.Where(p => p.Category.Name.Contains(filter.CategoryName));
        }
        
        return query;
    }

    public static IQueryable<Product> Paginate(this IQueryable<Product> query, int? pageNumber, int? pageSize)
    {
        var number = pageNumber ?? 1;
        var size = pageSize ?? 10;
        
        return query.Skip((number - 1) * size).Take(size);
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchString)
    {
        if (string.IsNullOrEmpty(searchString)) return query;
        searchString = searchString.ToLower();
        query = query.Where(p => 
            p.Name.ToLower().Contains(searchString) || 
            p.Description!.ToLower().Contains(searchString) || 
            p.NoteGeneral!.ToLower().Contains(searchString) || 
            p.Category.Name.ToLower().Contains(searchString));

        return query;
    }
}