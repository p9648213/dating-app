using System.ComponentModel.DataAnnotations;

namespace api_dotnet7.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}