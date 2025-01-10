using AutoMapper;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API.Mappings;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<ProductRequest, Product>();

        CreateMap<Product, ProductResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => new CategoryInProductResponse
            {
                Id = src.Category.Id,
                Name = src.Category.Name
            }));
        CreateMap<Product, ProductSimpleUserResponse>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => new CategoryInProductResponse
            {
                Id = src.Category.Id,
                Name = src.Category.Name
            }));
    }
}