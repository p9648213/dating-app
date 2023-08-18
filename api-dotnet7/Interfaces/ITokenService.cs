using api_dotnet7.Entities;

namespace api_dotnet7.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}