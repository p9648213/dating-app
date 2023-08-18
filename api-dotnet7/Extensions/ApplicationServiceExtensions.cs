using api_dotnet7.Data;
using api_dotnet7.Interfaces;
using api_dotnet7.Services;
using Microsoft.EntityFrameworkCore;

namespace api_dotnet7.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();

            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}