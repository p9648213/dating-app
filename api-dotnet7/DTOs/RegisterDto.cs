using System.ComponentModel.DataAnnotations;

namespace api_dotnet7.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; } = null!;
    }
}