using AutoMapper;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API.Mappings;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CategoryRequest, Category>();

        CreateMap<Category, CategoryResponse>()
            .ForMember(dest => dest.Products, 
                opt => opt.MapFrom(
                src => src.Products.Select(p => new ProductInCategoryResponse
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description
            })));
    }
}