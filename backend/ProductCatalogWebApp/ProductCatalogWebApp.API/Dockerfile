FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ProductCatalogWebApp.API/ProductCatalogWebApp.API.csproj", "ProductCatalogWebApp.API/"]
COPY ["ProductCatalogWebApp.Application/ProductCatalogWebApp.Application.csproj", "ProductCatalogWebApp.Application/"]
COPY ["ProductCatalogWebApp.Domain/ProductCatalogWebApp.Domain.csproj", "ProductCatalogWebApp.Domain/"]
COPY ["ProductCatalogWebApp.Persistence/ProductCatalogWebApp.Persistence.csproj", "ProductCatalogWebApp.Persistence/"]
RUN dotnet restore "ProductCatalogWebApp.API/ProductCatalogWebApp.API.csproj"
COPY . .
WORKDIR "/src/ProductCatalogWebApp.API"
RUN dotnet build "ProductCatalogWebApp.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ProductCatalogWebApp.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductCatalogWebApp.API.dll"]
