using AutoMapper;
using ProductCatalogWebApp.API.Contracts;
using ProductCatalogWebApp.Domain.Entities;

namespace ProductCatalogWebApp.API.Mappings;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<UserRequest, User>();
        CreateMap<User, UserResponse>();
    }
}