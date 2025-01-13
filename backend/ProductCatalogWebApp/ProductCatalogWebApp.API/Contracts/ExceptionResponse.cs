using System.Net;

namespace ProductCatalogWebApp.API.Contracts
{
    public record ExceptionResponse(HttpStatusCode StatusCode, string Description);
}
