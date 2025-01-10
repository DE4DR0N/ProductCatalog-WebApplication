using System.Net;

namespace RepositoryBNTU.API.DTOs
{
    public record ExceptionResponse(HttpStatusCode StatusCode, string Description);
}
