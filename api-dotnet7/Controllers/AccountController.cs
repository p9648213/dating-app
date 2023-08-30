using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using api_dotnet7.Data;
using api_dotnet7.DTOs;
using api_dotnet7.Entities;
using api_dotnet7.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_dotnet7.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly CookieOptions cookieOptions = new()
        {
            HttpOnly = true,
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true
        };

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExits(registerDto.UserName))
            {
                return BadRequest("Username is taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            CreateAndSendToken(user);

            return new UserDto
            {
                UserName = user.UserName,
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null)
            {
                return Unauthorized("Invalid Username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }

            CreateAndSendToken(user);

            return new UserDto
            {
                UserName = user.UserName,
            };
        }

        [Authorize]
        [HttpGet("info")]
        public ActionResult<UserDto> GetAccountInfo()
        {
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            return new UserDto
            {
                UserName = username
            };

        }

        [HttpGet("logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Delete("token", cookieOptions);

            return NoContent();
        }

        private void CreateAndSendToken(AppUser user)
        {
            var jwtToken = _tokenService.CreateToken(user);

            Response.Cookies.Append("token", jwtToken, cookieOptions);
        }

        private async Task<bool> UserExits(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}