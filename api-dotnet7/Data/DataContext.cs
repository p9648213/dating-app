using api_dotnet7.Entities;
using Microsoft.EntityFrameworkCore;

namespace api_dotnet7.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
    }
}